import { StyleSheet } from 'react-native'
import { scale } from '../../../constants/Layout';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create( {
  loadingContainer: {
    flex: 1,
    inset: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  spinnerContainer: {
    borderRadius: scale( 15 ),
    backgroundColor: Colors.accent.light,
    padding: scale( 12 )
  }
} );