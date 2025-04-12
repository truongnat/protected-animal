'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Check, Lock, ArrowLeft, Loader2 } from "lucide-react"
import { toast } from 'sonner'

export default function DonateClient() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('50')
  const [customAmount, setCustomAmount] = useState('')

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const amount = customAmount || selectedAmount
      toast.success(`Thank you for your $${amount} donation to Protected Animal!`)

      setTimeout(() => {
        router.push('/landing')
      }, 1500)

    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => router.push('/landing')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 text-foreground tracking-tight">
            Support Wildlife Conservation
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your generous donation helps us protect endangered species and preserve their natural habitats for future generations.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {[
            { number: '50+', label: 'Species Protected' },
            { number: '1000+', label: 'Animals Saved' },
            { number: '100+', label: 'Conservation Projects' },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">{stat.number}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Donation Card */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-foreground">Choose Your Impact Level</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonate}>
              {/* Donation Tiers */}
              <RadioGroup 
                value={selectedAmount} 
                onValueChange={(value) => {
                  setSelectedAmount(value)
                  setCustomAmount('')
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                {[
                  { amount: 25, impact: 'Feed an animal for a week' },
                  { amount: 50, impact: 'Provide medical care' },
                  { amount: 100, impact: 'Support habitat restoration' },
                ].map((tier) => (
                  <div key={tier.amount} className="relative h-full">
                    <RadioGroupItem
                      value={tier.amount.toString()}
                      id={`amount-${tier.amount}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`amount-${tier.amount}`}
                      className="flex flex-col p-6 border-2 rounded-xl cursor-pointer peer-data-[state=checked]:border-primary hover:border-primary/50 transition-colors h-full"
                    >
                      <span className="text-2xl font-bold text-primary">${tier.amount}</span>
                      <span className="text-sm text-muted-foreground">{tier.impact}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Custom Amount Input */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="custom-amount" className="text-foreground">Or Enter Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    id="custom-amount"
                    className="pl-8"
                    placeholder="Enter your amount"
                    min="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount('')
                    }}
                  />
                </div>
              </div>

              {/* Donation Button */}
              <Button 
                type="submit" 
                className="w-full text-lg h-12"
                variant="outline"
                disabled={isLoading || (!selectedAmount && !customAmount)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Donate ${customAmount || selectedAmount ? `$${customAmount || selectedAmount}` : 'Now'}`
                )}
              </Button>
            </form>

            <Separator className="my-8" />

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-6 text-muted-foreground text-sm">
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-primary" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-primary" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-muted-foreground">
          <p className="mb-2">
            Your donation is tax-deductible. You will receive a receipt via email.
          </p>
          <p className="text-sm">
            Questions? Contact us at support@protectedanimal.org
          </p>
        </div>
      </div>
    </main>
  )
} 