import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})

const StatBlock = ({ quantity, category }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight={'bold'}>{quantity}</Text>
      <Text color={'textSecondary'}>{category}</Text>
    </View>
  )
}

export default StatBlock