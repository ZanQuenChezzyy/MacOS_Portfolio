import { Dock, Navbar, Welcome } from "#components"
import { Contact, Finder, Image, Resume, Safari, Terminal, Text } from "#windows";

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
      <Contact />
    </main>
  )
}

export default App