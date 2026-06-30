import React, { useEffect, useRef } from "react";

function ChemistrySimulator({ type, controls }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    const clear = () => ctx.clearRect(0, 0, w, h);

    // ================= 1. pH INDICATOR =================
    const ph = () => {
      clear();

      const acid = controls.acid || 5;
      const base = controls.base || 7;

      const pH = (acid + base) / 2;

      let color =
        pH < 7 ? "#ef4444" :
        pH === 7 ? "#facc15" :
        "#22c55e";

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#111";
      ctx.font = "20px Arial";
      ctx.fillText("pH Indicator Experiment", 20, 40);

      ctx.fillStyle = color;
      ctx.fillRect(280, 120, 150, 200);

      ctx.fillStyle = "black";
      ctx.fillText(`pH Value: ${pH.toFixed(1)}`, 20, 100);

      frameRef.current = requestAnimationFrame(ph);
    };

    // ================= 2. TITRATION =================
    const titration = () => {
      clear();

      const acid = controls.acidStrength || 5;
      const base = controls.baseStrength || 5;

      const reaction = Math.min(
        acid,
        base + tRef.current * 0.05
      );

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#111";
      ctx.font = "20px Arial";
      ctx.fillText("Acid-Base Titration", 20, 40);

      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(300, 100, 100, 220);

      ctx.fillStyle = "#22c55e";
      ctx.fillRect(300, 320 - reaction * 10, 100, reaction * 10);

      ctx.fillText(
        `Neutralization: ${reaction.toFixed(1)}`,
        20,
        100
      );

      tRef.current += 0.05;

      frameRef.current = requestAnimationFrame(titration);
    };

    // ================= 3. GAS FORMATION =================
    const gas = () => {
  clear();

  const rate = controls.reactionRate || 5;

  // Background
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = "#111827";
  ctx.font = "bold 24px Arial";
  ctx.fillText("Gas Formation Reaction", 20, 40);

  // Reaction rate text
  ctx.font = "18px Arial";
  ctx.fillStyle = "#2563eb";
  ctx.fillText(`Reaction Rate: ${rate}`, 20, 80);

  // Glass Beaker
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 4;
  ctx.strokeRect(220, 80, 260, 280);

  // Liquid
  const liquidHeight = 170;

  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(
    223,
    360 - liquidHeight,
    254,
    liquidHeight
  );

  // Foam Layer
  ctx.fillStyle = "#ffffff";

  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(
      230 + i * 8,
      360 - liquidHeight,
      6,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Gas bubbles
  const bubbleCount = rate * 5;

  for (let i = 0; i < bubbleCount; i++) {
    const x =
      240 +
      ((i * 23 + tRef.current * 2) % 220);

    const y =
      340 -
      (
        (tRef.current * rate * 5 +
          i * 25) %
        160
      );

    const radius =
      4 + ((i + rate) % 5);

    ctx.beginPath();
    ctx.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "rgba(255,255,255,0.8)";
    ctx.fill();

    ctx.strokeStyle =
      "rgba(255,255,255,0.9)";
    ctx.stroke();
  }

  // Reaction vessel label
  ctx.fillStyle = "#1e293b";
  ctx.font = "16px Arial";
  ctx.fillText(
    "Acid + Carbonate",
    275,
    390
  );

  // Gas output indicator
  const gasLevel =
    Math.min(rate * 10, 100);

  ctx.fillStyle = "#16a34a";
  ctx.fillRect(
    550,
    300 - gasLevel,
    30,
    gasLevel
  );

  ctx.strokeStyle = "#111";
  ctx.strokeRect(
    550,
    200,
    30,
    100
  );

  ctx.fillStyle = "#111";
  ctx.fillText(
    "Gas",
    540,
    190
  );

  ctx.fillText(
    `${gasLevel}%`,
    535,
    330
  );

  // Gas arrow
  ctx.strokeStyle = "#16a34a";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(500, 120);
  ctx.lineTo(540, 120);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(540, 120);
  ctx.lineTo(530, 110);
  ctx.lineTo(530, 130);
  ctx.closePath();
  ctx.fillStyle = "#16a34a";
  ctx.fill();

  tRef.current += 0.5;

  frameRef.current =
    requestAnimationFrame(gas);
};
    // ================= 4. COMBUSTION =================
    const combustion = () => {
      clear();

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      const flame = 150 + Math.sin(tRef.current) * 40;

      ctx.fillStyle = "#111";
      ctx.font = "20px Arial";
      ctx.fillText("Combustion Reaction", 20, 40);

      ctx.fillStyle = `rgb(255, ${flame}, 0)`;

      ctx.beginPath();
      ctx.arc(350, 220, 50, 0, Math.PI * 2);
      ctx.fill();

      tRef.current += 0.1;

      frameRef.current = requestAnimationFrame(combustion);
    };

    // ================= 5. SALT FORMATION =================
    const salt = () => {
      clear();

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#111";
      ctx.font = "20px Arial";
      ctx.fillText("Salt Formation", 20, 40);

      const mix = (Math.sin(tRef.current) + 1) * 60;

      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(250, 150, 100, 100);

      ctx.fillStyle = "#fca5a5";
      ctx.fillRect(400, 150, 100, 100);

      ctx.fillStyle = "#22c55e";
      ctx.fillRect(300, 280, mix, 25);

      tRef.current += 0.05;

      frameRef.current = requestAnimationFrame(salt);
    };

    // ================= 6. MOLECULE BUILDER =================
    const molecule = () => {
      clear();

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#111";
      ctx.font = "20px Arial";
      ctx.fillText("Molecule Builder", 20, 40);

      const atoms = [
        { x: 300, y: 200 },
        { x: 350, y: 150 },
        { x: 400, y: 200 }
      ];

      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(300, 200);
      ctx.lineTo(350, 150);
      ctx.lineTo(400, 200);
      ctx.stroke();

      atoms.forEach((a) => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6";
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(molecule);
    };

    // ================= ROUTER =================
    if (type === "ph") ph();
    else if (type === "titration") titration();
    else if (type === "reaction") gas();
    else if (type === "combustion") combustion();
    else if (type === "salt") salt();
    else if (type === "molecule") molecule();

    return () => cancelAnimationFrame(frameRef.current);
  }, [type, controls]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={400}
      className="border rounded-xl bg-white"
    />
  );
}

export default ChemistrySimulator;