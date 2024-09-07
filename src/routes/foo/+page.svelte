<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Phaser from "phaser";
    import bgLink from "$lib/assets/bg.png";
    import caldronFg from "$lib/assets/pot_trans.png";
    import caldronBg from "$lib/assets/pot.png";
    import cornA from "$lib/assets/corn_a.png";
    import RAPIER from "@dimforge/rapier2d-compat/rapier";
    let game: Phaser.Game; // Type annotation for the Phaser game instance

    // Phaser configuration type
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        render: {
            transparent: true,
        },

        parent: "phaser-container",
        physics: {
            default: "arcade",
            arcade: {
                // gravity: { y: 0 },
                debug: false,
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };

    let raindrops: Phaser.GameObjects.Ellipse[] = []; // Type annotation for raindrops

    onMount(() => {
        game = new Phaser.Game(config);

        return () => {
            game.destroy(true); // Destroy the Phaser game when the component is unmounted
        };
    });

    // Define the types for Phaser's scene methods
    function preload(this: Phaser.Scene): void {
        // this.load.image("bg", bgLink);
        this.load.image("caldronFg", caldronFg);
        this.load.image("caldronBg", caldronBg);
        this.load.image("cornA", cornA);
    }

    async function create(this: Phaser.Scene) {
        await RAPIER.init();
        const rapierWorld = new RAPIER.World(new RAPIER.Vector2(0.0, 9.81));

        // Add background image
        // this.add.image(100, 500, "caldronBg").setOrigin(0, 0);
        const caldron = this.add.image(400, 500, "caldronFg").setOrigin(0, 0);
        const caldronColliderDesc = RAPIER.RigidBodyDesc.fixed();
        caldronColliderDesc.setTranslation(400.0, 500.0);
        caldronColliderDesc.setUserData(caldron);
        const caldronRigidBody =
            rapierWorld.createRigidBody(caldronColliderDesc);
        const colliderDesc = RAPIER.ColliderDesc.cuboid(100.0, 100.0);
        colliderDesc.setRestitution(0.7);

        rapierWorld.createCollider(colliderDesc, caldronRigidBody);

        this.add.image(400, 500, "cornA").setOrigin(0, 0);

        // Create initial raindrops
        for (let i = 0; i < 20; i++) {
            createRaindrop(this);
        }

        // Add more raindrops every 500ms
        this.time.addEvent({
            delay: 500,
            callback: () => createRaindrop(this),
            loop: true,
        });
    }

    function update(this: Phaser.Scene): void {
        raindrops.forEach((raindrop) => {
            raindrop.y += raindrop.getData("speed"); // Move the raindrop down by its speed
            if (raindrop.y > Number(config.height)) {
                // Reset the raindrop if it moves out of bounds
                raindrop.y = 0;
                raindrop.x = Phaser.Math.Between(0, Number(config.width));
            }
        });
    }

    function createRaindrop(scene: Phaser.Scene): void {
        const x = Phaser.Math.Between(0, Number(config.width));
        const y = Phaser.Math.Between(0, Number(config.height) / 2);
        const radius = Phaser.Math.Between(2, 5);

        // Create a circle (ellipse) representing a raindrop
        const raindrop = scene.add.ellipse(
            x,
            y,
            radius * 2,
            radius * 2,
            0x0000ff
        );
        raindrop.setData("speed", Phaser.Math.Between(2, 5)); // Store speed as custom data

        raindrops.push(raindrop);
    }

    // Clean up Phaser on component destruction
    onDestroy(() => {
        if (game) {
            game.destroy(true);
        }
    });
</script>

<main>
    <h1>Phaser Rainfall in Svelte (TypeScript)</h1>
    <div id="phaser-container"></div>
</main>

<style>
    canvas {
        display: block;
        margin: 0 auto;
    }
</style>
