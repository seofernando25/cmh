import type { DialogManager } from "$lib/utils/dialog";
import corn_happy from "$lib/assets/corn_a.png";
import corn_derpy from "$lib/assets/corn_b.png";
import corn_sad from "$lib/assets/corn_c.png";
import { playSong } from "$lib/utils/bgm";
import { playSFX } from "$lib/utils/sfx";

import cornelia from "$lib/assets/cornwitch.png";

export default async (gameSequence: DialogManager) => {
    gameSequence.dialogOpacity.set(0);
    await gameSequence.sleep(500);
    gameSequence.dialogOpacity.set(1);

    playSong("The Picnic Bop");

    const dialogMe = async (text: string) => {
        await gameSequence.dialog(text, { name: "Me" });
    };
    const dialogCornelia = async (text: string) => {
        await gameSequence.dialog(text, { name: "Cornelia" });
    };

    // gameSequence.charCenter.set(cornelia);
    // gameSequence.charLeft.set(cornelia);
    // gameSequence.charRight.set(cornelia);

    gameSequence.currentPortrait.set(corn_happy);
    await dialogMe("It's already autumn...");

    await dialogMe(
        "The leaves are falling... I can see the change in the air."
    );

    gameSequence.currentPortrait.set(corn_sad);
    await dialogMe(
        "The weather’s getting colder... and with it, I Can't help but to feel lonelier in my quaint little shop."
    );
    await dialogMe("Sigh Maybe some day things will be different");
    await gameSequence.dialog(
        `The door chimes softly as a stranger enters the shop.`
    );
    gameSequence.currentPortrait.set(corn_happy);

    await gameSequence.dialog("A customer! I haven't had one in so long.");
    await gameSequence.dialog(
        "Bright orange hair, a quirky little candy hat and vibrantly colored skin. The stranger is unlike anyone I've ever seen before."
    );
    playSong("Runaway Five The Daily Show");
    gameSequence.currentPortrait.set(undefined);
    gameSequence.charRight.set(cornelia);
    await gameSequence.dialog(
        "Oh... What a charming place! But it's so... quiet. Where's all the candy?",
        {
            name: "???",
        }
    );
    gameSequence.currentPortrait.set(corn_derpy);
    await gameSequence.dialog("My heart skips a beat.");
    await dialogMe(
        "Oh, hello hello! Welcome to my shop! I'm sorry, we're still in the final stages of setting up."
    );
    await gameSequence.dialog(
        "Not exactly a lie, right? The candy will be here… eventually. I wasn’t expecting anyone this soon. She seems excited though—maybe a little too excited."
    );
    gameSequence.currentPortrait.set(undefined);
    await gameSequence.dialog("The witch narrowed her eyes at me.");
    playSFX("Cornelia Hmm");
    await dialogCornelia("You do have candy, right?");
};
