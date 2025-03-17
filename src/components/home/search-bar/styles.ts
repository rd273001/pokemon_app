import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { scale, verticalScale } from "../../../constants/Layout";

const { white, gray } = Colors;

export const styles = StyleSheet.create( {
  container: {
    padding: scale( 15 ),
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: white.default,
    borderRadius: scale( 8 ),
    alignItems: 'center',
    paddingHorizontal: scale( 12 ),
    paddingVertical: verticalScale( 8 ),
    borderWidth: scale( 1 ),
    borderColor: gray.light
  },
  icon: {
    marginRight: scale( 8 ),
  },
  input: {
    flex: 1,
    fontSize: scale( 16 )
  },
} );