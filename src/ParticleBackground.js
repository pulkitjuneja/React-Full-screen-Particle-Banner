import React, { Component } from "react";
import * as THREE from "three";
import { BackgroundContainer, Overlay } from "./ParticleBackground.style";
import * as TWEEN from "tween";

class ParticleBackground extends Component {
  componentDidMount() {
    this.initParticles();
    this.startAnimation();
  }

  render() {
    return (
      <BackgroundContainer
        innerRef={container => {
          this.container = container;
        }}
      >
        <div
          ref={canvas => {
            this.canvas = canvas;
          }}
        />
        <Overlay>{this.props.children}</Overlay>
      </BackgroundContainer>
    );
  }

  initParticles() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 500;

    this.material = new THREE.PointsMaterial({
      color: 0xdfe6e9,
      size: 3,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    this.particleCount = 15000;
    this.particles = new THREE.Geometry();

    for (var i = 0; i < this.particleCount; i++) {
      var px = Math.random() * 2000 - 1000;
      var py = Math.random() * 2000 - 1000;
      var pz = Math.random() * 2000 - 1000;
      const particle = new THREE.Vector3(px, py, pz);
      particle.velocity = new THREE.Vector3(0, Math.random(), 0);
      this.particles.vertices.push(particle);
    }

    this.points = new THREE.Points(this.particles, this.material);
    this.points.sortParticles = true;
    this.scene.add(this.points);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(this.material.color);
    this.canvas.appendChild(this.renderer.domElement);
    this.registerWindowResize();
  }

  registerWindowResize() {
    const currentInstance = this;
    this.onWindowResize = () => {
      currentInstance.camera.aspect = window.innerWidth / window.innerHeight;
      currentInstance.camera.updateProjectionMatrix();
      currentInstance.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", this.onWindowResize, false);
  }

  startAnimation() {
    const currentInstance = this;
    const xSpeed = 0.0005;
    const ySpeed = 0.001;

    this.update = () => {
      requestAnimationFrame(currentInstance.update);
      currentInstance.scene.rotation.x += xSpeed * 5;
      var i = currentInstance.particleCount;
      while (i--) {
        var particle = currentInstance.particles.vertices[i];

        // y
        if (particle.y > 1000) {
          particle.y = -1000;
          particle.velocity.y = Math.random();
        }
        particle.velocity.y += Math.random() * ySpeed;

        particle.add(particle.velocity);
      }
      currentInstance.points.geometry.verticesNeedUpdate = true;

      currentInstance.renderParticles();
    };
    this.update();
  }

  renderParticles() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default ParticleBackground;
