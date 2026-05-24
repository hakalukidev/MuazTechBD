import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Khan Multi Brand</CardTitle>
          <CardDescription>
            Welcome to your multi-brand e-commerce platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
