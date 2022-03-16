import { View, StyleSheet, Image, Pressable } from "react-native";
import * as Linking from 'expo-linking';

import theme from "../theme";
import Text from "./Text";
import StatBlock from "./StatBlock";

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.white,
    padding: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 20
  },
  description: {
    marginTop: 10
  },
  languagecontainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  languageText: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
  },
  repoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  repoInfo: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
    textAlign: 'center'
  }
})

const RepositoryItem = ({ item, showGithubButton }) => {

  const kCalculator = (number) => {
    if (number >= 1000) {
      return `${Math.round(number / 100) / 10}k`
    } else {
      return number
    }
  }

  return (
    <View testID='repositoryItem' style={styles.item}>
      <View style={styles.repoInfo}>
        <Image style={styles.avatar} source={{ uri: `${item.ownerAvatarUrl}` }} />
        <View>
          <Text fontWeight={'bold'}>{item.fullName}</Text>
          <Text style={styles.description} color={'textSecondary'}>{item.description}</Text>
          <View style={styles.languagecontainer}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.repoStats}>
        <StatBlock quantity={kCalculator(item.stargazersCount)} category={'Stars'} />
        <StatBlock quantity={kCalculator(item.forksCount)} category={'Forks'} />
        <StatBlock quantity={item.reviewCount} category={'Reviews'} />
        <StatBlock quantity={item.ratingAverage} category={'Rating'} />
      </View>
      {showGithubButton &&
        <Pressable onPress={() => Linking.openURL(item.url)} >
          <Text style={styles.button} fontWeight='bold' fontSize='subheading'>Open in GitHub</Text>
        </Pressable>
      }
    </View>
  )
}

export default RepositoryItem;