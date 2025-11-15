// App.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ------------------ TMDb ------------------
const TMDB_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzAwZWU5NDQ1ODBjNGYxMWZlNTMyZGIxZTAwNjEzOSIsIm5iZiI6MTc2MTY5MTQ0MC41MDMsInN1YiI6IjY5MDE0NzMwZmM3OTQxNzk1MDRlOTM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FjUPXkT1IcgJoULo14L7KMmsdQ9Cjcre3NEb06VRPJc';

// ------------------ ProfileCard ------------------
function ProfileCard({ name, subtitle, avatarUri, tags = [], rating, onPress }) {
  const screenWidth = Dimensions.get('window').width;
  const posterWidth = screenWidth * 0.3; // Poster 30% of screen width
  const posterHeight = posterWidth * 1.5; // Maintain 2:3 aspect ratio

  return (
    <View style={[stylesCard.card, { width: screenWidth - 30 }]}>
      <View style={stylesCard.headerRow}>
        <View>
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={[stylesCard.avatar, { width: posterWidth, height: posterHeight }]}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                stylesCard.avatar,
                stylesCard.noPoster,
                { width: posterWidth, height: posterHeight },
              ]}
            >
              <Text>No Image</Text>
            </View>
          )}
          {rating !== undefined && (
            <View style={stylesCard.ratingBadge}>
              <Text style={stylesCard.ratingText}>{rating.toFixed(1)}⭐</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1, paddingLeft: 12 }}>
          <Text style={stylesCard.name}>{name}</Text>
          <Text style={stylesCard.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={stylesCard.tagRow}>
        {tags.map((t) => (
          <View key={t} style={stylesCard.tag}>
            <Text style={stylesCard.tagText}>{t}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={stylesCard.buttonRow} onPress={onPress}>
        <Text style={stylesCard.buttonText}>Add to Watch List</Text>
      </TouchableOpacity>
    </View>
  );
}

// ------------------ Home Screen ------------------
function HomeScreen({ navigation }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 12, name: 'Adventure' },
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 10751, name: 'Family' },
  ];

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 80) / 3;

  const handleGetMovie = () => {
    if (!selectedGenre) {
      Alert.alert('No genre selected', 'Please select a genre first.');
      return;
    }
    navigation.navigate('Movies', { genre: selectedGenre });
  };

  return (
    <View style={stylesHome.container}>
      <Text style={stylesHome.title}>CineMatch 🎬</Text>
      <Text style={stylesHome.subtitle}>Select a genre</Text>

      <View style={stylesHome.genreContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              stylesHome.genreButton,
              { width: buttonWidth },
              selectedGenre?.id === genre.id && stylesHome.genreButtonSelected,
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text style={stylesHome.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={stylesHome.getMovieButton} onPress={handleGetMovie}>
        <Text style={stylesHome.getMovieText}>Get Movie</Text>
      </TouchableOpacity>
    </View>
  );
}

// ------------------ Movies Screen ------------------
function MovieScreen({ route }) {
  const { genre } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    let collectedMovies = [];
    let page = 1;

    try {
      while (collectedMovies.length < 20 && page <= 5) {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=en-US&include_adult=false&page=${page}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          collectedMovies = [...collectedMovies, ...data.results];
        } else break;
        page++;
      }

      setMovies(collectedMovies.slice(0, 20));
    } catch (err) {
      console.error('Error fetching movies:', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={stylesMovies.container}>
        <ActivityIndicator size="large" color="#2DD4BF" />
        <Text style={{ color: 'white', marginTop: 10 }}>Loading {genre.name} movies...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={stylesMovies.container}
      contentContainerStyle={{ paddingBottom: 50, gap: 16 }}
    >
      <Text style={stylesMovies.title}>{genre.name} Movies 🎬</Text>

      {movies.length === 0 ? (
        <Text style={stylesMovies.helper}>No movies found for {genre.name}.</Text>
      ) : (
        movies.map((movie) => (
          <ProfileCard
            key={movie.id}
            name={movie.title}
            subtitle={movie.overview || 'No description available.'}
            avatarUri={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ''
            }
            rating={movie.vote_average}
            tags={[genre.name]}
            onPress={() => Alert.alert(`${movie.title} added to Watch List!`)}
          />
        ))
      )}
    </ScrollView>
  );
}

// ------------------ Root App ------------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#1c1b1bff' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CineMatch' }} />
        <Stack.Screen name="Movies" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ------------------ Styles ------------------
const stylesHome = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1b1bff', padding: 20 },
  title: { marginTop: 80, textAlign: 'center', color: 'white', fontSize: 60, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { textAlign: 'center', color: '#E5E7EB', fontSize: 22, marginBottom: 25 },
  genreContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 },
  genreButton: { backgroundColor: '#1F4D45', paddingVertical: 10, borderRadius: 20, margin: 6, alignItems: 'center' },
  genreButtonSelected: { backgroundColor: '#2DD4BF' },
  genreText: { color: 'white', fontSize: 20, fontWeight: '600' },
  getMovieButton: { backgroundColor: '#3BA89C', width: '100%', height: 65, paddingVertical: 14, borderRadius: 14, alignSelf: 'center' },
  getMovieText: { color: 'black', fontSize: 25, fontWeight: '600', textAlign: 'center' },
});

const stylesMovies = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1b1bff', padding: 15 },
  title: { color: 'white', fontSize: 44, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  helper: { color: '#E5E7EB', textAlign: 'center', marginTop: 20 },
});

const stylesCard = StyleSheet.create({
  card: { backgroundColor: '#2c2b2bff', borderRadius: 16, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 },
  headerRow: { flexDirection: 'row' },
  avatar: { borderRadius: 12 },
  noPoster: { backgroundColor: '#444', justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 20, fontWeight: '700', color: 'white' },
  subtitle: { fontSize: 14, color: '#E5E7EB', marginTop: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  tag: { backgroundColor: '#1F4D45', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9999 },
  tagText: { fontSize: 14, color: 'white' },
  buttonRow: { backgroundColor: '#3BA89C', padding: 10, borderRadius: 12, alignSelf: 'flex-start', marginTop: 8 },
  buttonText: { color: 'black', fontWeight: '600' },
  ratingBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: '#FFD700', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  ratingText: { fontSize: 12, fontWeight: '700', color: 'black' },
});
