import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { scale, verticalScale } from "../../../constants/Layout";

const { gray } = Colors;

export const styles = StyleSheet.create( {
  container: {
    flexGrow: 1,
    paddingHorizontal: scale( 15 ),
    paddingVertical: verticalScale( 15 ),
    rowGap: scale( 15 ),
  },
  columnWrapperContainer: {
    flex: 1,
    columnGap: scale( 15 ),
  },
  loader: {
    marginVertical: verticalScale( 20 ),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale( 20 ),
  },
  emptyText: {
    fontSize: scale( 18 ),
    color: gray.medium,
    textAlign: 'center',
  },
  endMessage: {
    textAlign: 'center',
    padding: scale( 15 ),
    color: gray.medium,
  },
} );