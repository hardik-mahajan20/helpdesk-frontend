export interface ThemeContextType {
  mode: 'light' | 'dark'
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
  color: 'blue' | 'green' | 'purple' | 'orange'
  setColor: React.Dispatch<
    React.SetStateAction<'blue' | 'green' | 'purple' | 'orange'>
  >
}
