import { StyleSheet } from 'react-native';

export const commonStyles = {
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rideScoreText: {
    marginLeft: 10,
    fontSize: 16,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  versionText: {
    fontSize: 14,
  },
};

export const darkStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#121212',
  },
  backButton: {
    paddingRight: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#9ca5b3',
  },
  rideScoreText: {
    color: '#ffffff',
    ...commonStyles.rideScoreText,
  },
  menuItemText: {
    color: '#ffffff',
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 26,
  },
  versionText: {
    color: '#9ca5b3',
    ...commonStyles.versionText,
  },
  ...commonStyles,
});

export const lightStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    paddingRight: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#606060',
  },
  rideScoreText: {
    color: '#000000',
    ...commonStyles.rideScoreText,
  },
  menuItemText: {
    color: '#000000',
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 26,
  },
  versionText: {
    color: '#606060',
    ...commonStyles.versionText,
  },
  ...commonStyles,
});
