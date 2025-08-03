export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject('Not in a browser environment');
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        async (error) => {
          console.warn('Geolocation failed, falling back to IP-based:', error);

          // fallback using IP-based geolocation
          try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            if (data && data.latitude && data.longitude) {
              resolve({
                latitude: data.latitude,
                longitude: data.longitude,
              });
            } else {
              reject('Could not determine location from IP');
            }
          } catch (ipError) {
            reject('IP-based location failed');
          }
        },
        { timeout: 5000 }
      );
    } else {
      reject('Geolocation is not supported in this browser');
    }
  });
};
