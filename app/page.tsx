import { Chat } from './chat';
import { Contact } from "./contact";
import { Introduction } from "./introduction";

export default function RootPage() {
  return (
    <>
      <Introduction />
      <Chat className='my-12 scroll-mt-14' />
      <Contact className='my-12 scroll-mt-14' />
    </>
  )
}
