import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-display-sm md:text-display-md font-bold leading-tight mb-6">
            Pronto a trasformare
            <br />
            <span className="text-muted-foreground">il tuo ristorante?</span>
          </h2>

          <p className="text-body-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Unisciti a oltre 500 ristoratori italiani. Inizia gratis oggi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button size="lg" className="group text-base px-8 py-6 h-auto gradient-button text-primary-foreground">
              Inizia gratis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="https://wa.me/393533811359" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto w-full sm:w-auto border-white/10 hover:bg-white/5">
                Parla con noi
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground">
            {["Nessuna carta richiesta", "14 giorni gratis", "Cancella quando vuoi"].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
