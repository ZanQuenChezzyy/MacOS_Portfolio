import { Dock, Navbar, Welcome } from "#components"
import { Contact, Finder, Image, Photos, Resume, Safari, Terminal, Text } from "#windows";

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
      <Photos />
    </main>
  )
}

export default App