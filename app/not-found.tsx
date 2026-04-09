import { Metadata } from 'next'
import css from '@/app/page.module.css'

export const metadata: Metadata = {
  title: "Title 404",
  description: "the not found title 404",
  openGraph: {
      title: "Not Found",
      description: "Page Not Found",
      url: `https://notehub.com/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
        }
      ]
    }
};

const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}

export default NotFound