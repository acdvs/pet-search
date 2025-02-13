import LoginForm from '@/components/LoginForm';

export default async function Index() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[300px]">
        <h1 className="text-center">Adopt A Dog</h1>
        <p className="mb-5 text-muted-foreground">
          Login to instantly start searching for an adoptable dog!
        </p>
        <LoginForm className="space-y-3" />
      </div>
    </div>
  );
}
