import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { scale, verticalScale } from "../../constants/Layout";

const { white, gray, black } = Colors;

export const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: white.medium,
    marginTop: '20%',
    borderTopLeftRadius: scale( 25 ),
    borderTopRightRadius: scale( 25 )
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale( 15 ),
    marginBottom: verticalScale( 15 )
  },
  title: {
    fontSize: scale( 20 ),
    fontWeight: 'bold'  ,
    color:black.dark,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale( 10 ),
    paddingVertical: verticalScale( 15 ),
    paddingHorizontal: scale( 15 ),
    borderBottomWidth: scale( 1 ),
    borderBottomColor: gray.light,
  },
  typeName: {
    fontSize: scale( 16 ),
    color: black.dark,
  },
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
} );