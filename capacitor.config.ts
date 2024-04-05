import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pl.webkor.darts.app',
  appName: 'Darts Counter',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
