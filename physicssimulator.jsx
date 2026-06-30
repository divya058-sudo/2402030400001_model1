import React, { useEffect, useRef } from "react";

function PhysicsSimulator({ type, controls }) {
  
  const canvasRef = useRef(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let t = 0;
    let frame;

    const w = canvas.width;
    const h = canvas.height;

    const clear = () => ctx.clearRect(0, 0, w, h);

    // ================= 1. PENDULUM (UNCHANGED) =================
    const pendulum = () => {
      clear();

      const length = controls.length || 120;
      const angle = controls.angle || 20;

      const angleRad =
        Math.sin(t) * (angle * Math.PI / 180);

      const originX = w / 2;
      const originY = 50;

      const bobX = originX + length * Math.sin(angleRad);
      const bobY = originY + length * Math.cos(angleRad);

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fill();

      // OUTPUT (kept same style)
      const timePeriod =
        2 * Math.PI * Math.sqrt(length / 100);

      const oscillations =
        Math.floor(t / (2 * Math.PI));

      ctx.fillStyle = "black";
      ctx.font = "18px Arial";

      ctx.fillText(
        `Time Period: ${timePeriod.toFixed(2)} s`,
        20,
        30
      );

      ctx.fillText(
        `Oscillations: ${oscillations}`,
        20,
        60
      );

      t += 0.05;

      frame = requestAnimationFrame(pendulum);
    };

    // ================= 2. PROJECTILE (FIXED + SMOOTH) =================
    const projectile = () => {

      clear();

      const speed = controls.speed || 50;
      const angleDeg = controls.angle || 45;

      const angle = (angleDeg * Math.PI) / 180;

      const g = 9.8;
      const scale = 4;

      const startX = 80;
      const groundY = 320;

      const vx = speed * Math.cos(angle);
      const vy = speed * Math.sin(angle);

      const x = startX + vx * t * scale;
      const y = groundY - (vy * t - 0.5 * g * t * t) * scale;

      // ground
      ctx.fillStyle = "#6b8e23";
      ctx.fillRect(0, groundY, w, h - groundY);

      // trajectory trail
      ctx.beginPath();
      for (let tt = 0; tt <= t; tt += 0.02) {
        const px = startX + vx * tt * scale;
        const py = groundY - (vy * tt - 0.5 * g * tt * tt) * scale;

        if (tt === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "orange";
      ctx.stroke();

      // ball
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#ff4500";
      ctx.fill();
      ctx.stroke();

      // velocity vector
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + vx * 0.8, y - vy * 0.8);
      ctx.strokeStyle = "blue";
      ctx.stroke();

      // ================= OUTPUT PANEL =================
      const range =
        (speed * speed * Math.sin(2 * angle)) / g;

      const maxHeight =
        (speed * speed * Math.pow(Math.sin(angle), 2)) /
        (2 * g);

      const flightTime =
        (2 * speed * Math.sin(angle)) / g;

      const currentHeight = Math.max(
        0,
        vy * t - 0.5 * g * t * t
      );

      const currentDistance = vx * t;

      ctx.fillStyle = "black";
      ctx.font = "16px Arial";

      ctx.fillText(`Speed: ${speed}`, 20, 30);
      ctx.fillText(`Angle: ${angleDeg}°`, 20, 60);
      ctx.fillText(`Range: ${range.toFixed(1)} m`, 20, 90);
      ctx.fillText(`Max Height: ${maxHeight.toFixed(1)} m`, 20, 120);
      ctx.fillText(`Flight Time: ${flightTime.toFixed(2)} s`, 20, 150);

      ctx.fillStyle = "blue";
      ctx.fillText(`Time: ${t.toFixed(2)} s`, 450, 30);
      ctx.fillText(`Height: ${currentHeight.toFixed(2)} m`, 450, 60);
      ctx.fillText(`Distance: ${currentDistance.toFixed(2)} m`, 450, 90);

      // ================= ANIMATION FIX =================
      if (!stoppedRef.current) {
        if (y >= groundY && t > 0.5) {
          t = 0;
        } else {
          t += 0.02;
        }
      }

      frame = requestAnimationFrame(projectile);
    };

    // ================= 3–9 SAME =================
   const ohmsLaw = () => {
  clear();

  const voltage = controls.voltage || 5;
  const resistance = controls.resistance || 10;
  const current = voltage / resistance;

  const speed = current * 2;

  // ================= LAYOUT =================
  const leftPanel = 0;
  const rightPanel = 500;

  const left = 140;
  const top = 120;
  const right = 440;
  const bottom = 280;

  const perimeter =
    (right - left) * 2 +
    (bottom - top) * 2;

  // ================= BACKGROUND PANELS =================
  // Left diagram area
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, 500, h);

  // Right info panel
  ctx.fillStyle = "#111827";
  ctx.fillRect(500, 0, 200, h);

  // ================= TITLE =================
  ctx.fillStyle = "black";
  ctx.font = "bold 20px Arial";
  ctx.fillText("OHM'S LAW CIRCUIT", 20, 40);

  // ================= CIRCUIT WIRES =================
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.lineTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.lineTo(left, top);
  ctx.stroke();

  // ================= BATTERY =================
  ctx.strokeStyle = "black";

  ctx.beginPath();
  ctx.moveTo(left, 150);
  ctx.lineTo(left, 230);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(left + 20, 165);
  ctx.lineTo(left + 20, 215);
  ctx.stroke();

  ctx.fillText("+", left + 30, 160);
  ctx.fillText("-", left + 30, 240);
  ctx.fillText("Battery", left - 70, 210);

  // ================= RESISTOR =================
  ctx.fillStyle = "#d97706";
  ctx.fillRect(270, top - 15, 120, 30);

  ctx.strokeRect(270, top - 15, 120, 30);

  ctx.fillStyle = "black";
  ctx.fillText("Resistor", 300, top - 25);
  ctx.fillText(`${resistance} Ω`, 305, top + 40);

  // ================= BULB =================
  const brightness = Math.min(255, current * 80);

  ctx.beginPath();
  ctx.arc(right, 200, 25, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${brightness},${brightness},0)`;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.fillText("Bulb", right - 20, 240);

  // ================= MOVING CHARGES =================
  for (let i = 0; i < 10; i++) {
    const distance = t * speed * 30 + i * 40;

    const pos = getPos(distance, left, top, right, bottom, perimeter);

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
  }

  // ================= RIGHT INFO PANEL =================
  ctx.fillStyle = "white";
  ctx.font = "bold 18px Arial";

  ctx.fillText("READINGS", 520, 50);

  ctx.font = "16px Arial";
  ctx.fillText(`V = ${voltage} V`, 520, 100);
  ctx.fillText(`R = ${resistance} Ω`, 520, 140);

  ctx.fillText(`I = V / R`, 520, 190);
  ctx.fillText(`I = ${voltage}/${resistance}`, 520, 230);

  ctx.fillStyle = "#22c55e";
  ctx.fillText(`I = ${current.toFixed(2)} A`, 520, 280);

  ctx.fillStyle = "#38bdf8";
  ctx.fillText(`Charge Flow`, 520, 330);

  // ================= ANIMATION =================
  t += 0.05;

  frame = requestAnimationFrame(ohmsLaw);
};
// ================= NEWTON'S LAW =================
  const newton = () => {
  clear();

  const force = controls.force || 20;
  const mass = controls.mass || 10;

  const acceleration = force / mass;

  const groundY = 300;
  const boxY = groundY - 50;

  // persistent motion state
  if (!newton.x) newton.x = 100;
  if (!newton.v) newton.v = 0;

  // physics update
  newton.v += acceleration * 0.05;
  newton.v *= 0.98; // friction

  newton.x += newton.v * 0.05;

  // reset
  if (newton.x > w - 100) {
    newton.x = 100;
    newton.v = 0;
  }

  // ================= GROUND =================
  ctx.fillStyle = "#6b8e23";
  ctx.fillRect(0, groundY, w, h - groundY);

  // ================= OBJECT =================
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(newton.x, boxY, 60, 50);

  // ================= TRAIL (motion understanding) =================
  for (let i = 0; i < 10; i++) {
    ctx.globalAlpha = 0.1;
    ctx.fillRect(newton.x - i * 8, boxY, 60, 50);
  }
  ctx.globalAlpha = 1;

  // ================= FORCE ARROWS =================

  // Applied Force (red)
  ctx.beginPath();
  ctx.moveTo(newton.x + 30, boxY + 25);
  ctx.lineTo(newton.x + 30 + force * 2, boxY + 25);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillText("Applied Force", newton.x + 70, boxY + 20);

  // Friction (blue opposite direction)
  ctx.beginPath();
  ctx.moveTo(newton.x + 30, boxY + 40);
  ctx.lineTo(newton.x + 30 - 10, boxY + 40);
  ctx.strokeStyle = "blue";
  ctx.stroke();
  ctx.fillText("Friction", newton.x - 10, boxY + 60);

  // Net Force (green simplified)
  ctx.beginPath();
  ctx.moveTo(newton.x + 30, boxY + 15);
  ctx.lineTo(newton.x + 30 + (force - 10) * 2, boxY + 15);
  ctx.strokeStyle = "green";
  ctx.stroke();
  ctx.fillText("Net Force", newton.x + 40, boxY - 5);

  // ================= TEXT EXPLANATION =================
  ctx.fillStyle = "black";
  ctx.font = "18px Arial";

  ctx.fillText("NEWTON'S 2nd LAW (F = ma)", 20, 40);

  ctx.fillText(`Force (F): ${force} N`, 20, 80);
  ctx.fillText(`Mass (m): ${mass} kg`, 20, 110);
  ctx.fillText(`Acceleration (a = F/m): ${acceleration.toFixed(2)} m/s²`, 20, 140);

  ctx.fillStyle = "#1d4ed8";
  ctx.fillText(`Velocity: ${newton.v.toFixed(2)} m/s`, 20, 180);

  // ================= EXPLANATION BOX =================
  ctx.fillStyle = "#f3f4f6";
  ctx.fillRect(400, 20, 280, 120);

  ctx.fillStyle = "black";
  ctx.font = "16px Arial";

  ctx.fillText("Concept:", 410, 50);
  ctx.fillText("More Force → Faster motion", 410, 80);
  ctx.fillText("More Mass → Slower motion", 410, 110);

  frame = requestAnimationFrame(newton);
};// ================= FRICTION =================
 const friction = () => {
  clear();

  const mu = (controls.surfaceRoughness || 5) / 10;
  const mass = 10;
  const g = 9.8;

  const normal = mass * g;
  const frictionForce = mu * normal;
  const deceleration = frictionForce / mass;

  const groundY = 300;

  // ================= STATE =================
  if (!friction.x) friction.x = 100;
  if (!friction.v) friction.v = 10;

  friction.v -= deceleration * 0.02;
  if (friction.v < 0) friction.v = 0;

  friction.x += friction.v;

  if (friction.x > w - 100 || friction.v === 0) {
    friction.x = 100;
    friction.v = 10;
  }

  // ================= BACKGROUND (CLEAN LAYOUT) =================
  // left simulation area
  ctx.fillStyle = "#f9fafb";
  ctx.fillRect(0, 0, w, h);

  // ground
  ctx.fillStyle =
    mu < 0.3 ? "#93c5fd" : mu < 0.6 ? "#facc15" : "#b45309";

  ctx.fillRect(0, groundY, w, h - groundY);

  // ================= OBJECT =================
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(friction.x, groundY - 50, 60, 50);

  // motion trail (soft)
  for (let i = 1; i <= 6; i++) {
    ctx.globalAlpha = 0.08;
    ctx.fillRect(friction.x - i * 10, groundY - 50, 60, 50);
  }
  ctx.globalAlpha = 1;

  // ================= SIMPLE FORCE ARROWS =================
  ctx.lineWidth = 3;

  // motion direction
  ctx.beginPath();
  ctx.moveTo(friction.x + 30, groundY - 25);
  ctx.lineTo(friction.x + 80, groundY - 25);
  ctx.strokeStyle = "green";
  ctx.stroke();

  ctx.fillStyle = "green";
  ctx.font = "14px Arial";
  ctx.fillText("Motion", friction.x + 40, groundY - 35);

  // friction force
  ctx.beginPath();
  ctx.moveTo(friction.x + 30, groundY - 10);
  ctx.lineTo(friction.x - 10, groundY - 10);
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.fillText("Friction", friction.x - 60, groundY - 20);

  // ================= RIGHT INFO PANEL =================
  ctx.fillStyle = "#111827";
  ctx.fillRect(520, 0, 180, h);

  ctx.fillStyle = "white";
  ctx.font = "bold 16px Arial";
  ctx.fillText("FRICTION", 540, 40);

  ctx.font = "14px Arial";

  ctx.fillText(`μ = ${mu.toFixed(2)}`, 540, 90);
  ctx.fillText(`Mass = ${mass} kg`, 540, 120);

  ctx.fillText(`Normal = ${normal.toFixed(0)} N`, 540, 160);
  ctx.fillText(`Friction = ${frictionForce.toFixed(0)} N`, 540, 190);

  ctx.fillStyle = "#22c55e";
  ctx.fillText(`Velocity`, 540, 240);
  ctx.fillText(`${friction.v.toFixed(2)} m/s`, 540, 270);

  // ================= EXPLANATION BOX =================
  ctx.fillStyle = "#e5e7eb";
  ctx.fillRect(20, 20, 460, 80);

  ctx.fillStyle = "black";
  ctx.font = "14px Arial";

  ctx.fillText("Concept:", 30, 45);
  ctx.fillText("Friction is a force that opposes motion.", 30, 70);
  ctx.fillText("Higher μ → object stops faster", 30, 95);

  frame = requestAnimationFrame(friction);
};// ================= REFLECTION =================
    const reflection = () => {
  clear();

  // ================= PARAMETERS =================
  const angleDeg = controls.angle || 30;
  const theta = (angleDeg * Math.PI) / 180;

  const mirrorX = 350;
  const mirrorTop = 80;
  const mirrorBottom = 320;

  const scale = 180;

  // ================= BACKGROUND =================
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, w, h);

  // ================= MIRROR =================
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(mirrorX, mirrorTop);
  ctx.lineTo(mirrorX, mirrorBottom);
  ctx.stroke();

  ctx.fillStyle = "#374151";
  ctx.fillText("Mirror", mirrorX + 10, 60);

  // ================= NORMAL LINE =================
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "#6b7280";
  ctx.beginPath();
  ctx.moveTo(mirrorX, mirrorTop);
  ctx.lineTo(mirrorX, mirrorBottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillText("Normal", mirrorX + 10, 100);

  // ================= INCIDENT RAY =================
  const incidentStartX = mirrorX - Math.cos(theta) * scale;
  const incidentStartY = 200 - Math.sin(theta) * scale;

  ctx.beginPath();
  ctx.moveTo(incidentStartX, incidentStartY);
  ctx.lineTo(mirrorX, 200);
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#ef4444";
  ctx.fillText("Incident Ray", incidentStartX + 10, incidentStartY);

  // ================= REFLECTED RAY =================
  const reflectedEndX = mirrorX + Math.cos(theta) * scale;
  const reflectedEndY = 200 - Math.sin(theta) * scale;

  ctx.beginPath();
  ctx.moveTo(mirrorX, 200);
  ctx.lineTo(reflectedEndX, reflectedEndY);
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#3b82f6";
  ctx.fillText("Reflected Ray", reflectedEndX + 10, reflectedEndY);

  // ================= POINT OF INCIDENCE =================
  ctx.beginPath();
  ctx.arc(mirrorX, 200, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#facc15";
  ctx.fill();

  // ================= ANGLE ARC (IMPORTANT FOR UNDERSTANDING) =================
  ctx.beginPath();
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;

  ctx.arc(mirrorX, 200, 40, -theta, theta, false);
  ctx.stroke();

  ctx.fillStyle = "#10b981";
  ctx.fillText(`θi = θr = ${angleDeg}°`, mirrorX + 20, 260);

  // ================= INFO PANEL =================
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(520, 0, 180, h);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("REFLECTION", 535, 40);

  ctx.font = "13px Arial";

  ctx.fillText(`Incident Angle`, 535, 90);
  ctx.fillText(`θi = ${angleDeg}°`, 535, 115);

  ctx.fillText(`Reflected Angle`, 535, 150);
  ctx.fillText(`θr = ${angleDeg}°`, 535, 175);

  ctx.fillStyle = "#22c55e";
  ctx.fillText("Law of Reflection:", 535, 230);
  ctx.fillText("θi = θr", 535, 255);

  ctx.fillStyle = "#ffffff";
  ctx.fillText("Concept:", 535, 310);
  ctx.fillText("Angle of incidence", 535, 335);
  ctx.fillText("equals angle of reflection", 535, 355);

  // ================= LOOP =================
  frame = requestAnimationFrame(reflection);
};
// ================= REFRACTION =================
    const refraction = () => {
  clear();

  // ================= CONSTANTS =================
  const n1 = 1.0;   // air
  const n2 = 1.33;  // water

  const angleDeg = controls.angle || 30;
  const theta1 = (angleDeg * Math.PI) / 180;

  // Snell’s Law
  const theta2 = Math.asin((n1 * Math.sin(theta1)) / n2);

  // ================= SCENE LAYOUT =================
  const waterLine = 260;
  const normalX = 350;

  const scale = 180;

  // ================= BACKGROUND =================
  // Air region
  ctx.fillStyle = "#e8f4ff";
  ctx.fillRect(0, 0, w, waterLine);

  // Water region
  ctx.fillStyle = "#b9ddff";
  ctx.fillRect(0, waterLine, w, h - waterLine);

  // Interface
  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, waterLine);
  ctx.lineTo(w, waterLine);
  ctx.stroke();

  // ================= NORMAL LINE =================
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "#6b7280";
  ctx.beginPath();
  ctx.moveTo(normalX, 60);
  ctx.lineTo(normalX, h - 60);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#374151";
  ctx.fillText("Normal", normalX + 8, 80);

  // ================= INCIDENT RAY =================
  const incidentStartX = normalX - Math.sin(theta1) * scale;
  const incidentStartY = waterLine - Math.cos(theta1) * scale;

  ctx.beginPath();
  ctx.moveTo(incidentStartX, incidentStartY);
  ctx.lineTo(normalX, waterLine);
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 3;
  ctx.stroke();

  // ================= REFRACTED RAY =================
  const refractedEndX = normalX + Math.sin(theta2) * scale;
  const refractedEndY = waterLine + Math.cos(theta2) * scale;

  ctx.beginPath();
  ctx.moveTo(normalX, waterLine);
  ctx.lineTo(refractedEndX, refractedEndY);
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 3;
  ctx.stroke();

  // ================= POINT OF INCIDENCE =================
  ctx.beginPath();
  ctx.arc(normalX, waterLine, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#facc15";
  ctx.fill();

  // ================= LABELS =================
  ctx.fillStyle = "#111827";
  ctx.font = "14px Arial";

  ctx.fillText("Incident Ray", incidentStartX + 10, incidentStartY);
  ctx.fillStyle = "#ef4444";

  ctx.fillText("Refracted Ray", refractedEndX + 10, refractedEndY);

  // ================= INFO PANEL (PRO UI STYLE) =================
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(520, 0, 180, h);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("REFRACTION", 535, 40);

  ctx.font = "13px Arial";

  ctx.fillText("Medium 1: Air", 535, 90);
  ctx.fillText("n₁ = 1.00", 535, 115);

  ctx.fillText("Medium 2: Water", 535, 150);
  ctx.fillText("n₂ = 1.33", 535, 175);

  ctx.fillText(`θ₁ = ${angleDeg}°`, 535, 220);
  ctx.fillText(
    `θ₂ = ${(theta2 * 180 / Math.PI).toFixed(2)}°`,
    535,
    250
  );

  ctx.fillStyle = "#22c55e";
  ctx.fillText("Snell’s Law:", 535, 300);
  ctx.fillText("n₁ sinθ₁ = n₂ sinθ₂", 535, 325);

  ctx.fillStyle = "#ffffff";
  ctx.fillText("Insight:", 535, 380);
  ctx.fillText("Light bends due to", 535, 405);
  ctx.fillText("change in speed", 535, 425);

  // ================= LOOP =================
  frame = requestAnimationFrame(refraction);
};
// ================= CIRCUIT =================
   const circuit = () => {
  clear();

  // ================= PARAMETERS =================
  const voltage = controls.voltage || 5;
  const resistance = controls.resistance || 10;

  const current = voltage / resistance;

  const speed = current * 2;

  // ================= LAYOUT =================
  const left = 150;
  const top = 120;
  const right = 450;
  const bottom = 280;

  const perimeter =
    (right - left) * 2 + (bottom - top) * 2;

  // ================= BACKGROUND =================
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, w, h);

  // ================= WIRE LOOP =================
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.lineTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.lineTo(left, top);
  ctx.stroke();

  // ================= BATTERY =================
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(left, 150);
  ctx.lineTo(left, 230);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(left + 20, 165);
  ctx.lineTo(left + 20, 215);
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.fillText("+", left + 30, 160);
  ctx.fillText("-", left + 30, 240);
  ctx.fillText("Battery", left - 70, 210);

  // ================= RESISTOR =================
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(280, top - 15, 120, 30);

  ctx.strokeStyle = "#000";
  ctx.strokeRect(280, top - 15, 120, 30);

  ctx.fillStyle = "#000";
  ctx.fillText("Resistor", 310, top - 25);
  ctx.fillText(`${resistance} Ω`, 315, top + 40);

  // ================= BULB =================
  const brightness = Math.min(255, current * 80);

  ctx.beginPath();
  ctx.arc(right, 200, 25, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${brightness},${brightness},0)`;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.fillText("Bulb", right - 20, 240);

  // ================= MOVING CHARGES =================
  function getPos(distance) {
    distance = distance % perimeter;

    if (distance < right - left)
      return { x: left + distance, y: top };

    distance -= right - left;

    if (distance < bottom - top)
      return { x: right, y: top + distance };

    distance -= bottom - top;

    if (distance < right - left)
      return { x: right - distance, y: bottom };

    distance -= right - left;

    return { x: left, y: bottom - distance };
  }

  for (let i = 0; i < 12; i++) {
    const d = t * speed * 40 + i * 35;
    const pos = getPos(d);

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
  }

  // ================= INFO PANEL =================
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(520, 0, 180, h);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("ELECTRIC CIRCUIT", 530, 40);

  ctx.font = "13px Arial";

  ctx.fillText(`Voltage: ${voltage} V`, 530, 90);
  ctx.fillText(`Resistance: ${resistance} Ω`, 530, 120);

  ctx.fillText(`Current: ${current.toFixed(2)} A`, 530, 160);

  ctx.fillStyle = "#22c55e";
  ctx.fillText("Formula:", 530, 210);
  ctx.fillText("I = V / R", 530, 235);

  ctx.fillStyle = "#fff";
  ctx.fillText("Concept:", 530, 290);
  ctx.fillText("Higher V → more current", 530, 315);
  ctx.fillText("Higher R → less current", 530, 335);

  // ================= ANIMATION =================
  t += 0.03;

  frame = requestAnimationFrame(circuit);
};// ================= MAGNET =================
    const magnet = () => {
  clear();

  // ================= MAGNET =================
  const magnetX = 350;
  const magnetY = 200;
  const magnetWidth = 120;
  const magnetHeight = 40;

  const strength = controls.strength || 6;

  // ================= BACKGROUND =================
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, w, h);

  // ================= MAGNET BODY =================
  ctx.fillStyle = "red";
  ctx.fillRect(magnetX - magnetWidth / 2, magnetY - magnetHeight / 2, magnetWidth / 2, magnetHeight);
  ctx.fillStyle = "blue";
  ctx.fillRect(magnetX, magnetY - magnetHeight / 2, magnetWidth / 2, magnetHeight);

  ctx.strokeStyle = "#111";
  ctx.strokeRect(magnetX - magnetWidth / 2, magnetY - magnetHeight / 2, magnetWidth, magnetHeight);

  ctx.fillStyle = "#000";
  ctx.fillText("N", magnetX - 40, magnetY + 5);
  ctx.fillText("S", magnetX + 25, magnetY + 5);

  // ================= FIELD LINES =================
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2;

  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();

    const offsetY = i * 25;

    ctx.moveTo(magnetX - 60, magnetY + offsetY);

    // curved field line
    for (let x = -60; x <= 60; x += 10) {
      const curve = Math.sin(x / 20) * strength * 5;

      ctx.lineTo(magnetX + x, magnetY + offsetY + curve);
    }

    ctx.stroke();
  }

  // ================= MOVING IRON PARTICLES =================
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;

    const radius =
      80 + Math.sin(t + i) * strength * 8;

    const x = magnetX + Math.cos(angle) * radius;
    const y = magnetY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#6b7280";
    ctx.fill();
  }

  // ================= FORCE INDICATION =================
  ctx.strokeStyle = "#22c55e";
  ctx.beginPath();
  ctx.moveTo(magnetX, magnetY);
  ctx.lineTo(magnetX, magnetY - 80);
  ctx.stroke();

  ctx.fillStyle = "#22c55e";
  ctx.fillText("Magnetic Force ↑", magnetX + 10, magnetY - 90);

  // ================= INFO PANEL =================
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(520, 0, 180, h);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("MAGNETIC FIELD", 530, 40);

  ctx.font = "13px Arial";

  ctx.fillText("North Pole (N)", 530, 90);
  ctx.fillText("South Pole (S)", 530, 120);

  ctx.fillText(`Strength: ${strength}`, 530, 160);

  ctx.fillStyle = "#22c55e";
  ctx.fillText("Concept:", 530, 220);
  ctx.fillText("Field flows N → S", 530, 245);
  ctx.fillText("Stronger magnet =", 530, 270);
  ctx.fillText("denser field lines", 530, 290);

  ctx.fillStyle = "#fff";
  ctx.fillText("Effect:", 530, 340);
  ctx.fillText("Attracts iron particles", 530, 365);

  // ================= ANIMATION =================
  t += 0.03;

  frame = requestAnimationFrame(magnet);
};
    // ROUTER
    if (type === "pendulum") pendulum();
    else if (type === "projectile") projectile();
    else if (type === "ohmsLaw") ohmsLaw();
    else if (type === "newton") newton();
    else if (type === "friction") friction();
    else if (type === "reflection") reflection();
    else if (type === "refraction") refraction();
    else if (type === "circuit") circuit();
    else if (type === "magnet") magnet();

    return () => cancelAnimationFrame(frame);

  }, [type, controls]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={700}
        height={400}
        className="border rounded-xl bg-white"
      />

      {type === "projectile" && (
        <button
          onClick={() => {
            stoppedRef.current = !stoppedRef.current;
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Stop / Resume
        </button>
      )}
    </div>
  );
}
function getPos(distance, left, top, right, bottom, perimeter) {
  distance = distance % perimeter;

  if (distance < right - left) {
    return { x: left + distance, y: top };
  }

  distance -= right - left;

  if (distance < bottom - top) {
    return { x: right, y: top + distance };
  }

  distance -= bottom - top;

  if (distance < right - left) {
    return { x: right - distance, y: bottom };
  }

  distance -= right - left;

  return { x: left, y: bottom - distance };
}

export default PhysicsSimulator;