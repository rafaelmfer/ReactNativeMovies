import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onDetails }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.popularity}>Popularity: {movie.popularity}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <TouchableOpacity style={styles.detailsButton} onPress={onDetails}>
          <Text style={styles.detailsButtonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    margin: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popularity: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  detailsButton: {
    backgroundColor: '#00aaff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MovieCard;
