// Signal / Systems: optional desktop WebGL accent—subtle telemetry, no gameplay dependency, and a safe CSS fallback.
import { useEffect, useRef } from "react";

type WebGLHaloProps = {
  accent: "lime" | "ice";
  tiltX: number;
  tiltY: number;
};

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  uniform float uTime;
  uniform vec2 uTilt;
  void main() {
    float drift = sin(uTime * 0.8 + aPosition.y * 7.0) * 0.018;
    vec2 p = aPosition + vec2(drift + uTilt.y * 0.012, cos(uTime * 0.7 + aPosition.x * 6.0) * 0.014 + uTilt.x * 0.012);
    gl_Position = vec4(p, 0.0, 1.0);
    gl_PointSize = 2.2 + 1.3 * sin(uTime + aPosition.x * 8.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uTime;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float glow = max(0.0, 1.0 - length(uv) * 2.0);
    gl_FragColor = vec4(uColor, glow * (0.38 + 0.18 * sin(uTime * 1.8)));
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function WebGLHalo({ accent, tiltX, tiltY }: WebGLHaloProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef({ x: tiltX, y: tiltY });
  tiltRef.current = { x: tiltX, y: tiltY };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "low-power" });
    if (!gl) return;
    const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!program || !buffer) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    const positions = new Float32Array([
      -0.88, -0.58, -0.62, -0.2, -0.42, 0.38, -0.1, -0.42, 0.08, 0.56, 0.32, -0.22, 0.52, 0.32, 0.76, -0.42,
      -0.72, 0.48, -0.24, 0.1, 0.2, -0.04, 0.46, 0.46, 0.72, -0.12, 0.86, 0.48,
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const tiltLocation = gl.getUniformLocation(program, "uTilt");
    const colorLocation = gl.getUniformLocation(program, "uColor");
    const color = accent === "lime" ? [0.78, 1, 0.36] : [0.72, 0.9, 1];
    let frame = 0;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height);
    };
    const render = (time: number) => {
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(tiltLocation, tiltRef.current.x, tiltRef.current.y);
      gl.uniform3f(colorLocation, color[0], color[1], color[2]);
      gl.drawArrays(gl.POINTS, 0, positions.length / 2);
      frame = requestAnimationFrame(render);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [accent]);

  return <canvas ref={canvasRef} className="webgl-halo" aria-hidden="true" />;
}
