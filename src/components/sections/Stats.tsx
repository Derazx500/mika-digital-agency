import { STATS } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export function Stats() {
  return (
    <section className="border-y border-gray-200 bg-white py-12 sm:py-16">
      <div className="container-mika">
        <ul className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 70}>
              <p className="text-[36px] font-medium leading-none tracking-[-0.03em] text-gray-900 sm:text-[48px] lg:text-[56px]">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] leading-[1.4] text-gray-500 sm:text-[14px]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
