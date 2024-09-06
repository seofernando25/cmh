<script lang="ts">
    import { goto } from "$app/navigation";
    import bg from "$lib/assets/candyshop.webp";
    // import {
    //     characters,
    //     getActiveDate,
    //     type CharacterDescriptor,
    // } from "$lib/character";
    // import Button from "$lib/components/Button.svelte";
    // import { DateManager } from "$lib/dateState";
    // import {
    //     activeDate,
    //     activePlace,
    //     currentDay,
    //     currentText,
    // } from "$lib/stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    import cornwitch from "$lib/assets/cornwitch.png";
    import { DialogManager } from "$lib/utils/dialog";

    let dateInfo = {
        name: "",
        place: "",
        day: 0,
    };

    // let charInfo: CharacterDescriptor | undefined;

    const state = new DialogManager();

    const dateSeq = async (gameSequence: DialogManager) => {
        // Play audio
        // playSong("The Picnic Bop");

        gameSequence.dateOpacity.set(0);
        await gameSequence.sleep(500);
        await gameSequence.dateFadeIn();

        const dialogMe = async (text: string) => {
            await gameSequence.dialog(text, { name: "Me" });
        };
        const dialogCornelia = async (text: string) => {
            await gameSequence.dialog(text, { name: "Cornelia" });
        };

        await dialogMe("It's already autumn...");
        await dialogMe(
            "The leaves are falling... I can see the change in the air."
        );
        await dialogMe(
            "The weather’s getting colder... and with it, I Can't help but to feel lonelier in my quaint little shop."
        );
        await dialogMe("Sigh Maybe some day things will be different");
        await gameSequence.dialog(
            `The door chimes softly as a stranger enters the shop.`
        );
        await gameSequence.dialog("A customer! I haven't had one in so long.");
        await gameSequence.dialog(
            "Bright orange hair, a quirky little candy hat and vibrantly colored skin. The stranger is unlike anyone I've ever seen before."
        );
        await dialogCornelia(
            "Oh... What a charming place! But it's so... quiet. Where's all the candy?"
        );
        await gameSequence.dialog("My heart skips a beat.");
        await dialogMe(
            "Oh, hello hello! Welcome to my shop! I'm sorry, we're still in the final stages of setting up."
        );
        await gameSequence.dialog(
            "Not exactly a lie, right? The candy will be here… eventually. I wasn’t expecting anyone this soon. She seems excited though—maybe a little too excited."
        );
        await gameSequence.dialog("Cornelia's narrow with sudden focus.");
        await dialogCornelia("You do have candy, right?");

        // TODO Ding dong sound effect
    };

    dateSeq(state);

    onMount(() => {
        // const dateName = $activeDate;
        // const datePlace = $activePlace;
        // const dateDay = $currentDay;
        // dateInfo = {
        //     name: dateName,
        //     place: datePlace,
        //     day: dateDay,
        // };
        // const characterData = characters.find((c) => c.name === dateName);
        // if (!characterData) {
        //     goto("/picnic/embark");
        //     return;
        // }
        // const info = characterData.dateInfo;
        // charInfo = getActiveDate();
        // // info[day][place]
        // const day = info[dateDay];
        // if (!day) {
        //     // location.href = "/picnic/embark";
        //     console.log("day not found");
        //     return;
        // }
        // const gameSeq = day[datePlace];
        // if (!gameSeq) {
        //     // location.href = "/picnic/embark";
        //     console.log("place not found", datePlace);
        //     return;
        // }
        // gameSeq(state);
    });

    $: speaker = state.currentSpeaker;
    $: dateOpacity = state.dateOpacity;
    $: dateSpriteState = state.dateSprite;
    $: prompts = state.prompts;

    $: txt = state.currentText;

    const skipAction = () => {
        get(state.resolverFn)();
    };
</script>

<img src={bg} alt="portrait" class="bg" />

<!-- <div class="absolute top-0 left-0 bg-white/50 p-1">
	Date Day: {dateInfo.day}
	<br />
	Date Name: {dateInfo.name}
	<br />
	Date Place: {dateInfo.place}
</div>

<span class="flex-1"></span> -->

<!-- {#if $prompts}
	<div class="absolute top-0 flex gap-4 pt-4">
		{#each $prompts as prompt, i}
			<Button
				on:click={() => {
					state.pickedPrompt.set(i);
				}}>{prompt}</Button
			>
		{/each}
	</div>
{/if} -->

<!-- <div
	class="absolute -z-10 w-full h-full flex flex-col place-items-center"
	style="opacity: {$characterOpacity}"
>
	<img
		class="absolute bottom-16 w-[13rem]"
		src={dateSprite}
		alt={dateInfo?.name}
	/>
	<img
		class="absolute bottom-16 w-[13rem] translate-x-2 translate-y-2 img-backdrop -z-10"
		src={dateSprite}
		alt={dateInfo?.name}
	/>
</div> -->

<!-- Panel Prompt -->
<!-- {#if $speaker} -->
<!-- <div class="text-center bg-white/25 w-24 p-2">aaaa</div> -->
<!-- {/if} -->
<!-- <button
        on:click={skipAction}
        class="flex w-full bg-white/25 p-4 h-32 text-black"
    >
        {$currentText}
    </button> -->

<!-- <style>
	.img-backdrop {
		filter: brightness(0);
	}
</style> -->

<!-- <div class="bg"></div> -->

<div
    class="dialog"
    on:click={skipAction}
    on:keypress={undefined}
    role="button"
    tabindex="0"
    style="opacity: {$dateOpacity}"
>
    <img src={cornwitch} alt="portrait" class="portrait" />
    <!-- <div class="portrait-container">
    </div> -->
    <div class="text">
        {$speaker} <br />
        {$txt}
    </div>
</div>

<img src={cornwitch} alt="portrait" class="char-right" />

<style>
    .bg {
        position: absolute;
        width: 100%;
        height: 100vh;
        /* background-color: black; */
        /* blur */
        filter: blur(5px);
        scale: 1.1;
    }

    .dialog {
        position: absolute;
        padding: 1rem;
        bottom: 5%;
        left: 5%;
        right: 5%;
        height: 20rem;
        background-color: rgb(from #6f1c1b r g b / 0.8);
        box-shadow: 20px 20px 2px #99582a;
        border: 0.5rem solid #bb9557;
        display: flex;
    }

    .portrait {
        box-sizing: border-box;
        height: 100%;
        object-fit: scale-down;

        /* ALIGN left */
    }

    .char-right {
        position: absolute;
        right: 5rem;
        bottom: -10rem;
        width: 30%;
        object-fit: contain;
        transition: all 0.2s ease-out;
    }

    .char-right:hover {
        bottom: -8rem;
    }

    .text {
        color: #bb9557;
    }
</style>
