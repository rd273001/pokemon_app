import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { scale, verticalScale } from "../../../constants/Layout";

const { accent, white } = Colors;

export const styles = StyleSheet.create( {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale( 15 ),
    paddingVertical: verticalScale( 10 ),
    backgroundColor: accent.dark
  },
  title: {
    fontSize: scale( 20 ),
    fontWeight: 'bold',
    color: white.light,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: scale( 8 ),
    marginLeft: scale( 8 ),
  }
} );