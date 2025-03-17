import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { scale, verticalScale, width } from "../../../constants/Layout";

const { white, gray, black } = Colors;

export const styles = StyleSheet.create( {
  // Grid view styles
  gridCard: {
    width: (width - scale( 30 + (15 * 2) )) / 3,   // For 3 columns - do scale(30 + (15 x (numOfColumns-1))) / numOfColumns
    backgroundColor: white.light,
    borderRadius: scale( 12 ),
    padding: scale( 10 ),
    alignItems: 'center',
    boxShadow: '0 2 4 1 #00000014'
  },
  gridImage: {
    width: '100%',
    aspectRatio: 1,
  },
  gridInfoContainer: {
    marginTop: verticalScale( 8 ),
    alignItems: 'center',
  },
  gridName: {
    fontSize: scale( 14 ),
    fontWeight: '600',
    color: black.dark,
  },
  gridId: {
    fontSize: scale( 14 ),
    color: gray.medium,
    marginTop: verticalScale( 4 ),
  },

  // List view styles
  listCard: {
    flexDirection: 'row',
    backgroundColor: white.light,
    borderRadius: scale( 12 ),
    padding: scale( 12 ),
    boxShadow: '0 2 4 1 #00000014'
  },
  listImage: {
    width: scale( 80 ),
    height: scale( 80 ),
  },
  listInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: scale( 15 ),
  },
  listName: {
    fontSize: scale( 16 ),
    fontWeight: '600',
    color: black.dark,
  },
  listId: {
    fontSize: scale( 14 ),
    color: gray.medium,
    marginTop: verticalScale( 4 ),
  },
} );