import ErrorScreen from '@/components/feedback/error';

export default function NotFound() {
  return (
    <ErrorScreen
      title="404 Page not found"
      message="Sorry, the page you're looking for could not be found. Please check the URL and try again. If you think this is a mistake, please contact the website administrator for assistance."
    />
  );
}
