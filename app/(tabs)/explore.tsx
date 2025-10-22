import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PROFILES } from '@/app/data/data';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

// Dummy profile data


export default function Explore() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [lastSwipe, setLastSwipe] = useState(null);

  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => onSwipeComplete('like'));
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => onSwipeComplete('nope'));
  };

  const swipeSuperLike = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT },
      duration: 300,
      useNativeDriver: false,
    }).start(() => onSwipeComplete('superlike'));
  };

  const onSwipeComplete = (direction) => {
    const profile = profiles[currentIndex];
    setLastSwipe({ profile, direction, index: currentIndex });
    
    setCurrentIndex(currentIndex + 1);
    position.setValue({ x: 0, y: 0 });
    setCurrentPhotoIndex(0);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const handleUndo = () => {
    if (lastSwipe) {
      setCurrentIndex(lastSwipe.index);
      setLastSwipe(null);
      position.setValue({ x: 0, y: 0 });
    }
  };

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyTitle}>That's everyone for now!</Text>
          <Text style={styles.emptySubtitle}>Check back later for more profiles</Text>
        </View>
      </View>
    );
  }

  const rotateAndTranslate = {
    transform: [
      { rotate: rotation },
      ...position.getTranslateTransform(),
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#0066FF" />
        </TouchableOpacity>
      </View>

      {/* Cards Stack */}
      <View style={styles.cardContainer}>
        {/* Next card preview */}
        {profiles[currentIndex + 1] && (
          <View style={[styles.card, styles.nextCard]}>
            <Image
              source={{ uri: profiles[currentIndex + 1].photos[0] }}
              style={styles.cardImage}
            />
          </View>
        )}

        {/* Current card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.card, rotateAndTranslate]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setSelectedProfile(currentProfile)}
          >
            <Image
              source={{ uri: currentProfile.photos[currentPhotoIndex] }}
              style={styles.cardImage}
            />

            {/* Photo indicators */}
            <View style={styles.photoIndicators}>
              {currentProfile.photos.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.indicator,
                    idx === currentPhotoIndex && styles.indicatorActive,
                  ]}
                />
              ))}
            </View>

            {/* Like/Nope overlays */}
            <Animated.View
              style={[
                styles.likeLabel,
                { opacity: likeOpacity },
              ]}
            >
              <Text style={styles.likeLabelText}>LIKE</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.nopeLabel,
                { opacity: nopeOpacity },
              ]}
            >
              <Text style={styles.nopeLabelText}>NOPE</Text>
            </Animated.View>

            {/* Profile info */}
            <View style={styles.cardInfo}>
              <View style={styles.cardInfoHeader}>
                <Text style={styles.cardName}>
                  {currentProfile.name}, {currentProfile.age}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedProfile(currentProfile)}
                >
                  <Ionicons name="information-circle" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={14} color="#fff" />
                <Text style={styles.cardLocation}>{currentProfile.distance}</Text>
              </View>
              <Text style={styles.cardBio}>{currentProfile.bio}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.nopeButton]}
          onPress={swipeLeft}
        >
          <Ionicons name="close" size={32} color="#FF4458" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.undoButton]}
          onPress={handleUndo}
          disabled={!lastSwipe}
        >
          <Ionicons
            name="arrow-undo"
            size={24}
            color={lastSwipe ? '#FFA500' : '#ccc'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={swipeSuperLike}
        >
          <Ionicons name="star" size={28} color="#0066FF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={swipeRight}
        >
          <Ionicons name="heart" size={32} color="#00D664" />
        </TouchableOpacity>
      </View>

      {/* Profile Detail Modal */}
      <Modal
        visible={!!selectedProfile}
        animationType="slide"
        onRequestClose={() => setSelectedProfile(null)}
      >
        {selectedProfile && (
          <View style={styles.modalContainer}>
            <ScrollView>
              {/* Profile images */}
              <View style={styles.modalImageContainer}>
                <Image
                  source={{ uri: selectedProfile.photos[0] }}
                  style={styles.modalImage}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedProfile(null)}
                >
                  <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Profile details */}
              <View style={styles.modalContent}>
                <Text style={styles.modalName}>
                  {selectedProfile.name}, {selectedProfile.age}
                </Text>
                
                <View style={styles.modalInfoRow}>
                  <Ionicons name="briefcase-outline" size={18} color="#666" />
                  <Text style={styles.modalInfoText}>{selectedProfile.job}</Text>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons name="school-outline" size={18} color="#666" />
                  <Text style={styles.modalInfoText}>{selectedProfile.education}</Text>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons name="location-outline" size={18} color="#666" />
                  <Text style={styles.modalInfoText}>{selectedProfile.location}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.modalBio}>{selectedProfile.bio}</Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.interestsContainer}>
                  {selectedProfile.interests.map((interest, idx) => (
                    <View key={idx} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>

                {/* Additional photos */}
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Photos</Text>
                <View style={styles.photosGrid}>
                  {selectedProfile.photos.map((photo, idx) => (
                    <Image
                      key={idx}
                      source={{ uri: photo }}
                      style={styles.gridPhoto}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Bottom actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalActionButton}
                onPress={() => {
                  setSelectedProfile(null);
                  swipeLeft();
                }}
              >
                <Ionicons name="close" size={28} color="#FF4458" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalLikeButton]}
                onPress={() => {
                  setSelectedProfile(null);
                  swipeRight();
                }}
              >
                <Ionicons name="heart" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0066FF',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    position: 'absolute',
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  photoIndicators: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    gap: 4,
  },
  indicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
  indicatorActive: {
    backgroundColor: '#fff',
  },
  likeLabel: {
    position: 'absolute',
    top: 60,
    right: 30,
    borderWidth: 4,
    borderColor: '#00D664',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    transform: [{ rotate: '20deg' }],
  },
  likeLabelText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00D664',
  },
  nopeLabel: {
    position: 'absolute',
    top: 60,
    left: 30,
    borderWidth: 4,
    borderColor: '#FF4458',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    transform: [{ rotate: '-20deg' }],
  },
  nopeLabelText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF4458',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  },
  cardInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  cardLocation: {
    fontSize: 14,
    color: '#fff',
  },
  cardBio: {
    fontSize: 15,
    color: '#fff',
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 15,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nopeButton: {
    width: 55,
    height: 55,
  },
  undoButton: {
    width: 50,
    height: 50,
  },
  superLikeButton: {
    width: 50,
    height: 50,
  },
  likeButton: {
    width: 55,
    height: 55,
    backgroundColor: '#0066FF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalImageContainer: {
    position: 'relative',
    height: SCREEN_HEIGHT * 0.5,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
  },
  modalName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  modalInfoText: {
    fontSize: 16,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  modalBio: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F7FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066FF',
  },
  interestText: {
    fontSize: 14,
    color: '#0066FF',
    fontWeight: '600',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridPhoto: {
    width: (SCREEN_WIDTH - 56) / 3,
    height: 150,
    borderRadius: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  modalActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF4458',
  },
  modalLikeButton: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
});