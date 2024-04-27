import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'
import img1 from '../assests/air_quality_image.webp'
import img2 from '../assests/delhi_pollution_image.webp'
import img3 from '../assests/tourism_impact_image.webp'

const BlogScreen = () => {
  const blogPosts = [
    {
      title: 'Ambient (Outdoor) Air Quality and Health',
      image: img1,
      link: 'https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health?gad_source=1'
    },
    {
      title: "How Delhi's Air Pollution Can Destroy Lives",
      image: img2,
      link: 'https://pharmeasy.in/blog/how-delhis-air-pollution-can-destroy-lives/'
    },
    {
      title: "The Impact of Air Pollution on India's Tourism Industry",
      image: img3,
      link: 'https://www.aqi.in/blog/the-impact-of-air-pollution-on-indias-tourism-industry/'
    }
  ]

  const handleLinkPress = (link) => {
    Linking.openURL(link)
  }

  const renderBlogCards = () => {
    return blogPosts.map((post, index) => (
      <TouchableOpacity
        key={index}
        style={styles.blogCard}
        onPress={() => handleLinkPress(post.link)}
      >
        <ImageBackground
          source={post.image}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Text style={styles.blogTitle}>{post.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    ))
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.TextContainer}>Blog Posts</Text>

        <View style={styles.blogContainer}>{renderBlogCards()}</View>

        <Footer activeOption="book-outline" />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextContainer: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10
  },
  blogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blogCard: {
    width: 350,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 20
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    resizeMode: 'cover'
  },
  blogTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlignVertical: 'top',
    color: 'black'
  }
})

export default BlogScreen
