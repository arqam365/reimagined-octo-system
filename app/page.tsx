import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { MapPin, Phone, Star, Clock, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const featuredDishes = [
    {
      id: 1,
      name: 'Pizza Margherita',
      description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
      price: '25 SAR',
      image: '/pizza-margherita.jpg',
    },
    {
      id: 2,
      name: 'Pizza Pepperoni',
      description: 'Traditional pizza with premium pepperoni and mozzarella cheese',
      price: '30 SAR',
      image: '/risotto.jpg',
    },
    {
      id: 3,
      name: 'Pizza Quattro Formaggi',
      description: 'Four cheese blend with mozzarella, parmesan, gorgonzola, and ricotta',
      price: '35 SAR',
      image: '/tiramisu.jpg',
    },
  ]

  const reviews = [
    {
      name: 'أحمد محمد',
      rating: 5,
      comment: 'أفضل بيتزا إيطالية في جدة! الطعم أصلي والأسعار معقولة جداً.',
      avatar: '👨',
    },
    {
      name: 'فاطمة علي',
      rating: 5,
      comment: 'العائلة كلها استمتعت بالطعام. الجو دافئ وودود جداً.',
      avatar: '👩',
    },
    {
      name: 'محمود حسن',
      rating: 5,
      comment: 'تجربة رائعة! الخدمة ممتازة والبيتزا طازة جداً كل مرة.',
      avatar: '👨',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
          <Image
            src="/hero-pasta.jpg"
            alt="Mazencito Pizzeria Hero"
            width={1920}
            height={700}
            className="object-cover w-full h-full"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="elegant-text text-5xl md:text-7xl font-bold mb-4 text-balance">
                Mazencito
              </h1>
              <p className="text-xl md:text-2xl mb-2 text-white/90">
                Authentic Italian Taste in the Heart of Jeddah
              </p>
              <p className="text-lg md:text-xl mb-8 text-white/80">
                Fresh Ingredients. Traditional Recipes. Warm Hospitality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/menu"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
                >
                  View Menu
                </Link>
                <Link
                  href="/reservation"
                  className="px-8 py-3 bg-accent text-accent-foreground rounded font-medium hover:bg-accent/90 transition-colors"
                >
                  Reservation
                </Link>
                <a
                  href="tel:+966555674383"
                  className="px-8 py-3 bg-white/20 text-white rounded font-medium hover:bg-white/30 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="elegant-text text-4xl md:text-5xl font-bold mb-6 text-primary">
                  Welcome to Mazencito Pizzeria
                </h2>
                <p className="text-lg text-foreground/80 mb-4">
                  Experience authentic Italian pizza and cuisine in the heart of Jeddah. At Mazencito Pizzeria, we celebrate the tradition of Italian cooking with fresh ingredients, traditional recipes, and genuine hospitality.
                </p>
                <p className="text-lg text-foreground/80 mb-6">
                  Whether you're looking for a casual family dinner or a special gathering with friends, our warm and welcoming environment offers the perfect setting for unforgettable moments around great food.
                </p>
                <Link
                  href="/about"
                  className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                >
                  Learn Our Story →
                </Link>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/restaurant-interior.jpg"
                  alt="Mazencito Restaurant Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Dishes */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="elegant-text text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              Featured Pizzas
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">
              Our most loved creations
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-background"
                >
                  <div className="relative h-[250px]">
                    <Image
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="elegant-text text-2xl font-bold mb-2 text-primary">
                      {dish.name}
                    </h3>
                    <p className="text-foreground/70 mb-4">{dish.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-accent">
                        {dish.price}
                      </span>
                      <Link
                        href="/menu"
                        className="text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        View Menu →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opening Hours Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="elegant-text text-4xl md:text-5xl font-bold mb-2">
                  Open Daily
                </h2>
                <p className="text-xl text-primary-foreground/90">
                  1:00 PM – 1:00 AM
                </p>
              </div>
              <div className="text-center md:text-right">
                <Clock className="w-16 h-16 mx-auto md:mx-0 mb-4 text-accent" />
                <p className="text-lg text-primary-foreground/80">
                  We look forward to serving you!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="elegant-text text-4xl md:text-5xl font-bold mb-6 text-primary">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-xl mb-8 text-foreground/70">
              Book your table now and enjoy an evening of exceptional Italian pizza and cuisine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reservation"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
              >
                Reserve Your Table
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded font-medium hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="elegant-text text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              What Our Guests Say
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">
              Real experiences from our valued customers
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-background p-8 rounded-lg shadow-lg">
                  <div className="flex gap-1 mb-4">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">"{review.comment}"</p>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{review.avatar}</span>
                    <div>
                      <p className="font-bold text-foreground">{review.name}</p>
                      <p className="text-sm text-foreground/60">Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="elegant-text text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
              Visit Us in Jeddah
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="elegant-text text-xl font-bold mb-2">Location</h3>
                <p className="text-foreground/70">
                  King Abdulaziz Branch Road
                  <br />
                  Jeddah, Saudi Arabia
                </p>
              </div>

              <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="elegant-text text-xl font-bold mb-4">Call Us</h3>
                <div className="space-y-2">
                  <a
                    href="tel:+966555674383"
                    className="block text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    +966 55 567 4383
                  </a>
                  <a
                    href="tel:+966554430556"
                    className="block text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    +966 55 443 0556
                  </a>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="elegant-text text-xl font-bold mb-2">Hours</h3>
                <p className="text-foreground/70">
                  Open Daily
                  <br />
                  1:00 PM - 1:00 AM
                </p>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.8372839174876!2d39.17224!3d21.543915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sKing+Abdulaziz+Branch+Road!2sJeddah+Saudi+Arabia!5e0!3m2!1sen!2ssa!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mazencito Pizzeria Location"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
