import { Dock, Navbar, Welcome } from "#components"
import { Finder, Image, Resume, Safari, Terminal, Text } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
    </main>
  )
}

export default App