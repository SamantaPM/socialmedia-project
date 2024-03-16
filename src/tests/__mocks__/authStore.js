export const mockPlaySoundFile = jest.fn();
const useAuthStore = jest.fn().mockImplementation(() => {
  return ({
    userProfile: {
      _id: '231248960453',
      username: 'test-user',
      image: 'user-image-url'
    }
  });
});

export default useAuthStore;
