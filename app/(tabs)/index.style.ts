import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#444',
  },
  radioLabel: {
    fontSize: 16,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  timeInput: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footImage: {
    height: 320,
    aspectRatio: 1,
    resizeMode: 'contain',
  }
});