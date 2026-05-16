import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="elegant-text text-5xl md:text-6xl font-bold mb-4 text-primary">
              Our Story
            </h1>
            <p className="text-xl text-foreground/70">
              Where Italian Tradition Meets Jeddah Hospitality
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="elegant-text text-4xl font-bold mb-6 text-primary">
                About Mazencito Pizzeria
              </h2>
              <p className="text-lg text-foreground/80 mb-4">
                Mazencito Pizzeria was founded with a simple yet passionate mission: to bring authentic Italian pizza tradition to the heart of Jeddah. Our journey began with a deep love for Italian culinary heritage and an unwavering commitment to quality.
              </p>
              <p className="text-lg text-foreground/80 mb-4">
                Every pizza that leaves our kitchen is a masterpiece, crafted with traditional Italian techniques using the finest fresh ingredients. We believe in the power of food to create connections, build community, and celebrate the warmth and hospitality that defines both Italian and Saudi cultures.
              </p>
              <p className="text-lg text-foreground/80">
                Whether you're joining us for a casual family dinner or a special gathering with friends, Mazencito offers the perfect blend of authentic flavors, welcoming atmosphere, and genuine hospitality that turns a meal into a cherished memory.
              </p>
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

          {/* Craft Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <Image
                src="/chef.jpg"
                alt="Pizza Preparation"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="elegant-text text-4xl font-bold mb-6 text-primary">
                Our Craft
              </h2>
              <p className="text-lg text-foreground/80 mb-4">
                At Mazencito, we treat pizza making as an art form. Our dough is prepared fresh daily using a blend of premium Italian flours and traditional fermentation techniques that have been perfected over generations.
              </p>
              <p className="text-lg text-foreground/80 mb-4">
                Every ingredient—from San Marzano tomatoes to fresh mozzarella—is carefully selected to ensure the authentic taste of Italy in every bite. Our wood-fired oven reaches the perfect temperature to create crispy, wood-charred crusts while keeping the interior soft and flavorful.
              </p>
              <p className="text-lg text-foreground/80">
                We believe that true Italian pizza is not rushed. It's a labor of love that demands patience, precision, and a genuine passion for creating something extraordinary.
              </p>
            </div>
          </div>

          {/* Location & Hours Section */}
          <section className="bg-card rounded-lg p-12 mb-16">
            <h2 className="elegant-text text-4xl font-bold text-center mb-8 text-primary">
              Visit Us in Jeddah
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="elegant-text text-2xl font-bold mb-4 text-primary">
                  Location
                </h3>
                <p className="text-lg text-foreground/80 mb-6">
                  King Abdulaziz Branch Road
                  <br />
                  Jeddah, Saudi Arabia
                </p>
                <h3 className="elegant-text text-2xl font-bold mb-4 text-primary">
                  Hours
                </h3>
                <p className="text-lg text-foreground/80 mb-2">
                  <span className="font-bold">Open Daily</span>
                </p>
                <p className="text-lg text-foreground/80">
                  1:00 PM - 1:00 AM
                </p>
              </div>
              <div>
                <h3 className="elegant-text text-2xl font-bold mb-4 text-primary">
                  Get In Touch
                </h3>
                <p className="text-lg text-foreground/80 mb-4">
                  <span className="font-bold">Phone:</span>
                  <br />
                  <a
                    href="tel:+966555674383"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    +966 55 567 4383
                  </a>
                  <br />
                  <a
                    href="tel:+966554430556"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    +966 55 443 0556
                  </a>
                </p>
                <p className="text-lg text-foreground/80">
                  <span className="font-bold">WhatsApp:</span>
                  <br />
                  <a
                    href="https://wa.me/966555674383"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Message us on WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-12 mb-16">
            <h2 className="elegant-text text-4xl font-bold text-center mb-12 text-primary">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg border border-border text-center">
                <div className="elegant-text text-5xl mb-4">🌾</div>
                <h3 className="elegant-text text-2xl font-bold mb-3 text-primary">
                  Authenticity
                </h3>
                <p className="text-foreground/80">
                  We honor traditional Italian pizza-making methods, using time-tested recipes and authentic ingredients from Italy.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border text-center">
                <div className="elegant-text text-5xl mb-4">👨‍👩‍👧</div>
                <h3 className="elegant-text text-2xl font-bold mb-3 text-primary">
                  Family Values
                </h3>
                <p className="text-foreground/80">
                  We create a warm, welcoming environment where families and friends gather to share moments of joy and connection.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border text-center">
                <div className="elegant-text text-5xl mb-4">✨</div>
                <h3 className="elegant-text text-2xl font-bold mb-3 text-primary">
                  Excellence
                </h3>
                <p className="text-foreground/80">
                  We never compromise on quality. Every pizza is crafted with meticulous attention to detail and pride.
                </p>
              </div>
            </div>
          </section>

          {/* Customer Promise Section */}
          <section className="bg-background border-2 border-primary rounded-lg p-12 mb-16">
            <h2 className="elegant-text text-4xl font-bold text-center mb-8 text-primary">
              Our Promise to You
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
              <p>
                ✓ Fresh ingredients prepared daily with no shortcuts or compromises
              </p>
              <p>
                ✓ Traditional Italian pizza recipes passed down through generations
              </p>
              <p>
                ✓ Warm hospitality that reflects both Italian warmth and Saudi generosity
              </p>
              <p>
                ✓ A family-friendly environment perfect for celebrations and gatherings
              </p>
              <p>
                ✓ Fair pricing for premium quality that everyone can enjoy
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg text-center">
            <h2 className="elegant-text text-4xl font-bold mb-4">
              Experience Mazencito
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              Join us for an unforgettable experience of authentic Italian pizza and warm hospitality
            </p>
            <a
              href="/reservation"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded font-medium hover:bg-accent/90 transition-colors"
            >
              Reserve Your Table Today
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
