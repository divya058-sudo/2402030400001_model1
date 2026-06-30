import React, { useEffect, useRef } from "react";

function BiologySimulator({ type, controls }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    const clear = () => ctx.clearRect(0, 0, w, h);

    // ================= PHOTOSYNTHESIS =================
    const photosynthesis = () => {
      clear();

      const sunlight = controls.sunlight || 5;

      ctx.fillStyle = "#87ceeb";
      ctx.fillRect(0, 0, w, h);

      // Sun
      ctx.beginPath();
      ctx.arc(100, 80, 40 + sunlight, 0, Math.PI * 2);
      ctx.fillStyle = "#facc15";
      ctx.fill();

      // Plant stem
      ctx.fillStyle = "#15803d";
      ctx.fillRect(340, 180, 20, 150);

      // Leaves
      ctx.beginPath();
      ctx.arc(320, 220, 30, 0, Math.PI * 2);
      ctx.arc(380, 220, 30, 0, Math.PI * 2);
      ctx.fill();

      // Oxygen bubbles
      for (let i = 0; i < sunlight * 2; i++) {
        ctx.beginPath();
        ctx.arc(
          350 + Math.sin(i) * 40,
          150 - ((tRef.current * 5 + i * 25) % 120),
          5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      tRef.current += 0.5;
      frameRef.current = requestAnimationFrame(photosynthesis);
    };

    // ================= HEART =================
    const heart = () => {
      clear();

      const activity = controls.activity || 5;
      const beat = 1 + Math.sin(tRef.current) * (activity * 0.15);

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#ef4444";

      ctx.beginPath();
      ctx.arc(320, 180, 40 * beat, 0, Math.PI * 2);
      ctx.arc(380, 180, 40 * beat, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(280, 200);
      ctx.lineTo(350, 300);
      ctx.lineTo(420, 200);
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "24px Arial";
      ctx.fillText(`Heart Rate: ${60 + activity * 10} BPM`, 220, 60);

      tRef.current += 0.15;
      frameRef.current = requestAnimationFrame(heart);
    };

    // ================= MITOSIS =================
    const mitosis = () => {
      clear();

      const speed = controls.speed || 5;

      const spread =
        Math.abs(Math.sin(tRef.current * 0.02 * speed)) * 120;

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(350 - spread / 2, 220, 60, 0, Math.PI * 2);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(350 + spread / 2, 220, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "22px Arial";
      ctx.fillText("Cell Division (Mitosis)", 250, 80);

      tRef.current += 1;
      frameRef.current = requestAnimationFrame(mitosis);
    };

    // ================= DNA =================
    const dna = () => {
      clear();

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      for (let y = 50; y < 350; y += 10) {
        const x1 = 300 + Math.sin((y + tRef.current) * 0.05) * 50;
        const x2 = 400 + Math.sin((y + tRef.current) * 0.05) * 50;

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "#3b82f6";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#8b5cf6";
        ctx.fill();
      }

      ctx.fillStyle = "#111";
      ctx.font = "22px Arial";
      ctx.fillText("DNA Double Helix", 270, 30);

      tRef.current += 2;
      frameRef.current = requestAnimationFrame(dna);
    };

    // ================= LUNGS =================
   const lungs = () => {
  clear();

  const rate = controls.breathingRate || 5;

  const breath =
    Math.sin(tRef.current * 0.03 * rate);

  const lungWidth = 70 + breath * 20;
  const lungHeight = 110 + breath * 15;

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = "#111827";
  ctx.font = "bold 24px Arial";
  ctx.fillText(
    "Human Lung Breathing Mechanism",
    180,
    40
  );

  // Trachea
  ctx.fillStyle = "#94a3b8";
  ctx.fillRect(340, 50, 20, 90);

  // Bronchi
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 8;

  ctx.beginPath();
  ctx.moveTo(350, 140);
  ctx.lineTo(300, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(350, 140);
  ctx.lineTo(400, 180);
  ctx.stroke();

  // Left Lung
  ctx.beginPath();
  ctx.ellipse(
    280,
    240,
    lungWidth,
    lungHeight,
    0,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "#fca5a5";
  ctx.fill();

  // Right Lung
  ctx.beginPath();
  ctx.ellipse(
    420,
    240,
    lungWidth,
    lungHeight,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Rib Cage
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;

  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(
      350,
      240,
      120 + i * 8,
      Math.PI,
      0
    );
    ctx.stroke();
  }

  // Diaphragm
  const diaphragmY =
    340 - breath * 20;

  ctx.beginPath();
  ctx.moveTo(200, diaphragmY);

  ctx.quadraticCurveTo(
    350,
    diaphragmY + 50,
    500,
    diaphragmY
  );

  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 5;
  ctx.stroke();

  // Air particles
  for (let i = 0; i < 15; i++) {
    const y =
      120 +
      ((tRef.current * 3 + i * 20) % 180);

    ctx.beginPath();
    ctx.arc(
      350,
      y,
      4,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#60a5fa";
    ctx.fill();
  }

  // Status
  ctx.fillStyle = "#111827";
  ctx.font = "20px Arial";

  const status =
    breath > 0
      ? "Inhaling"
      : "Exhaling";

  ctx.fillText(
    `Breathing Rate: ${rate}`,
    20,
    80
  );

  ctx.fillText(
    `Status: ${status}`,
    20,
    120
  );

  tRef.current += 1;

  frameRef.current =
    requestAnimationFrame(lungs);
};

    // ================= POPULATION =================
    const population = () => {
      clear();

      const resources = controls.resources || 5;
      const birthRate = controls.birthRate || 5;

      // carrying capacity scales with resources
      const K = resources * 60;

      // initialize persistent population state
      if (!population.P) population.P = 20;

      // growth rate scaled
      const r = 0.01 * birthRate;

      // logistic growth step
      population.P =
        population.P + r * population.P * (1 - population.P / K);

      // draw background
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      // draw population as circles
      const count = Math.min(200, Math.round(population.P));
      for (let i = 0; i < count; i++) {
        const x = 40 + (i * 23) % (w - 80);
        const y = 120 + Math.floor((i * 23) / (w - 80)) * 26;

        ctx.beginPath();
        ctx.arc(x + Math.sin(tRef.current + i) * 3, y + Math.cos(tRef.current + i) * 2, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,197,94,0.8)";
        ctx.fill();
      }

      // info
      ctx.fillStyle = "#111827";
      ctx.font = "18px Arial";
      ctx.fillText("Population Growth", 20, 40);
      ctx.fillText(`Population: ${Math.round(population.P)}`, 20, 70);
      ctx.fillText(`Carrying capacity: ${K}`, 20, 100);

      tRef.current += 0.5;
      frameRef.current = requestAnimationFrame(population);
    };

    // ================= ROUTER =================

    if (type === "photosynthesis") photosynthesis();
    else if (type === "heart") heart();
    else if (type === "mitosis") mitosis();
    else if (type === "dna") dna();
    else if (type === "lungs") lungs();
    else if (type === "population") population();

    return () => cancelAnimationFrame(frameRef.current);
  }, [type, controls]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={400}
      className="border rounded-xl bg-white shadow-lg"
    />
  );
}

export default BiologySimulator;