const posts = [
  {
    slug: 'why-cardio-isnt-enough',
    title: 'Why Cardio Isnt Enough',
    excerpt: 'Running on a treadmill wont give you the results you want. Heres what actually works.',
    date: '2026-03-09',
    category: 'Fitness Basics',
    content: `## Why Cardio Isnt Enough

If you think doing 30 minutes on the elliptical is going to transform your body, I have got some bad news for you.

### The Problem with Pure Cardio

Cardio burns calories while you are doing it, but that is only half the battle. Here is what most people miss:

1. **It does not build muscle** - Muscle is metabolically active tissue. The more you have, the more calories you burn at rest.

2. **Your body adapts** - After a few weeks, your body becomes efficient at the same cardio routine. You burn fewer calories doing the same workout.

3. **It does not create the mechanical capacity** - Being in shape from cardio does not mean you are strong, mobile, or capable.

### What Actually Works

The research is clear: **strength training + conditioning** beats pure cardio every time for:
- Fat loss
- Metabolic health  
- Long-term functionality
- Bone density
- Injury prevention

### The Bottom Line

Do not skip cardio entirely - it is great for your heart and mental health. But if your goal is a transformed physique and real functional fitness, you need to lift heavy things too.

### Next Steps

If you are ready to build a program that actually works, check out my Fitness Direction service - I will assess where you are and build you a roadmap that combines strength and conditioning the right way.`
  },
  {
    slug: 'kinesiology-myths',
    title: '5 Kinesiology Myths Debunked',
    excerpt: 'What I learned in school that most trainers dont know.',
    date: '2026-03-09',
    category: 'Education',
    content: `## 5 Kinesiology Myths Debunked

As a Kinesiology graduate, I learned things in school that most personal trainers never learn. Here are some myths I see all the time:

### Myth 1: More Is Better

More sets, more reps, more workouts per week. Wrong. **Volume has diminishing returns**, and too much destroys your CNS and joints. Quality > quantity.

### Myth 2: Abs Are Made in the Kitchen

True, but incomplete. Your abs show when body fat is low, but they are built in the gym. You need both: **strength training builds the muscle, proper nutrition reveals it.**

### Myth 3: You Need Equipment to Build Muscle

Not even close. **Bodyweight training can build incredible strength and muscle** if you progress correctly. Pull-ups, push-ups, dips, pistol squats - these are gold.

### Myth 4: You Need to Stretch Before Working Out

Static stretching before lifting **actually decreases performance**. Save stretching for after your workout, or do dynamic warm-ups that prepare you for movement.

### Myth 5: The Keto/Carnivore/Vegan Diet Is Best

The best diet is the one you can **sustainably follow**. Every best diet works when in a calorie deficit. Find what fits your lifestyle.

### The Real Lesson

Kinesiology taught me to **think critically** about fitness claims. Always ask: What does the research actually say? and Does this make biomechanical sense?

### Work With Me

Want personalized, evidence-based guidance? Lets talk about your goals.`
  },
  {
    slug: 'how-to-warm-up',
    title: 'How to Warm Up Properly',
    excerpt: 'Stop wasting time on the elliptical. Here is what a real warm-up looks like.',
    date: '2026-03-09',
    category: 'Training Tips',
    content: `## How to Warm Up Properly

Most people waste 10 minutes on a treadmill and call it a warm-up. That is not a warm-up - that is cardio with extra steps.

### What a Warm-Up Should Actually Do

1. **Increase body temperature** - Get the blood flowing
2. **Prime the nervous system** - Get your CNS ready to fire
3. **Mobilize relevant joints** - For todays movement
4. **Activate key muscles** - Turn on what you will use

### The Perfect 10-Minute Warm-Up

**Minutes 1-3: General (everyone does this)**
- Light cardio: rowing, cycling, or walking
- Goal: break a light sweat

**Minutes 4-7: Dynamic Movement**
- Leg swings (front/back, side-to-side)
- Arm circles
- Hip circles
- Bodyweight squats (warm up the pattern)

**Minutes 8-10: Specific Activation**
- For upper body day: band pull-aparts, push-up variations
- For lower body day: glute bridges, step-ups, lunges
- For bench: light db presses, rotator cuff work

### What NOT To Do

- Static stretching (save for after)
- 20 minutes of steady-state cardio
- Nothing (going cold is a recipe for injury)

### The Bottom Line

A proper warm-up primes your body for performance and prevents injury. It is not optional - it is essential.

### Need Help?

I can build you a warm-up routine that is specific to your training.`
  },
  {
    slug: 'benefits-of-creatine',
    title: 'The Benefits of Creatine',
    excerpt: 'One of the most researched supplements in existence. Here is why every fitness enthusiast should consider it.',
    date: '2026-03-15',
    category: 'Nutrition',
    content: `## The Benefits of Creatine: What the Science Says

If there is one supplement that has more research backing it than any other, it is creatine. Here is why you should consider adding it to your routine.

### What Is Creatine?

Creatine is a naturally occurring compound found in muscle cells. It helps your body produce ATP - the primary energy currency for high-intensity exercise.

### The Proven Benefits

**1. Increased Strength & Power**
Creatine helps you lift more weight and produce more power during high-intensity efforts. Studies show consistent gains in both upper and lower body strength.

**2. Faster Muscle Growth**
When you can lift more weight, you create more muscle tension - the primary driver of muscle growth. Creatine also causes cell swelling, which may trigger growth pathways.

**3. Improved High-Intensity Performance**
Whether you are doing sets of 5 reps or sprinting, creatine helps you maintain performance throughout your workout.

**4. Better Brain Function**
Your brain uses creatine too. Research suggests improved cognitive function, especially in sleep-deprived states.

**5. May Support Long-Term Health**
Some research suggests creatine may have neuroprotective and anti-aging benefits, though more research is needed.

### Dosing

**Loading phase (optional):** 20g/day for 5-7 days
**Maintenance:** 3-5g/day

You do not need to load - taking 5g daily will saturate your muscles in about 3-4 weeks.

### Common Concerns

**Creatine makes you bloated**
Monohydrate can cause water retention under the skin for some people. Stay hydrated and consider creatine HCl if you are sensitive.

**It is bad for your kidneys**
Extensive research shows creatine is safe for healthy individuals with normal kidney function.

**You need to cycle it**
There is no need to cycle creatine. It stays in your system as long as you maintain intake.

### The Bottom Line

Creatine is one of the few supplements with strong scientific backing. It is cheap, safe, and effective. If you are serious about fitness, there is no reason not to take it.`
  }
];

async function updatePosts() {
  for (const post of posts) {
    const res = await fetch('https://wkkpykugeeydbmufvrtl.supabase.co/rest/v1/posts?slug=eq.' + post.slug, {
      method: 'PATCH',
      headers: {
        'apikey': 'sb_publishable_vBoLtbvnlnQ43N8KoPtnnw_We8uoS2C',
        'Authorization': 'Bearer sb_publishable_vBoLtbvnlnQ43N8KoPtnnw_We8uoS2C',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(post)
    });
    console.log(post.title, res.ok ? 'updated' : res.status);
  }
}

updatePosts();
