import type { DialogManager } from "$lib/utils/dialog";
import corn_happy from "$lib/assets/corn_a.png";
import corn_derpy from "$lib/assets/corn_b.png";
import corn_sad from "$lib/assets/corn_c.png";
import { playSong } from "$lib/utils/bgm";
import { playSFX } from "$lib/utils/sfx";

import cornelia from "$lib/assets/cornwitch.png";

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
    ? A
    : never;

export default async (gameSequence: DialogManager) => {
    gameSequence.dialogOpacity.set(0);
    await gameSequence.sleep(500);
    gameSequence.dialogOpacity.set(1);

    playSong("The Picnic Bop");
    let mePortrait: string | undefined = corn_sad;
    const dialogMe = async (
        text: string,
        opts: ArgumentTypes<typeof gameSequence.dialog>[1] = {}
    ) => {
        await gameSequence.dialog(text, {
            name: "Me",
            ...opts,
            portrait: mePortrait,
        });
    };
    let conreliaDisplayName = "???";
    const dialogCornelia = async (
        text: string,
        opts: ArgumentTypes<typeof gameSequence.dialog>[1] = {}
    ) => {
        gameSequence.currentPortrait.set(undefined);
        await gameSequence.dialog(text, { name: conreliaDisplayName, ...opts });
    };

    const dialogNarrator = async (
        text: string,
        opts: ArgumentTypes<typeof gameSequence.dialog>[1] = {}
    ) => {
        gameSequence.currentPortrait.set(undefined);
        await gameSequence.dialog(text, { name: "", ...opts });
    };

    // gameSequence.charCenter.set(cornelia);
    // gameSequence.charLeft.set(cornelia);
    // gameSequence.charRight.set(cornelia);

    mePortrait = corn_happy;
    await dialogMe("It's already autumn...");
    await dialogMe(
        "The leaves are falling... I can see the change in the air."
    );
    mePortrait = corn_sad;
    await dialogMe(
        "The weather’s getting colder... and with it, I Can't help but to feel lonelier in my quaint little shop."
    );
    await dialogMe("Sigh Maybe some day things will be different");

    await dialogNarrator(
        `The door chimes softly as a stranger enters the shop.`
    );
    mePortrait = corn_happy;

    await dialogNarrator("A customer! I haven't had one in so long.");
    await dialogNarrator(
        "Bright orange hair, a quirky little candy hat and vibrantly colored skin. The stranger is unlike anyone I've ever seen before."
    );
    playSong("Runaway Five The Daily Show");
    gameSequence.currentPortrait.set(undefined);
    gameSequence.charRight.set(cornelia);
    await dialogCornelia(
        "Oh... What a charming place! But it's so... quiet. Where's all the candy?"
    );
    await dialogNarrator("My heart skips a beat.");
    mePortrait = corn_derpy;
    await dialogMe(
        "Oh, hello hello! Welcome to my shop! I'm sorry, we're still in the final stages of setting up."
    );
    await dialogNarrator(
        "Not exactly a lie, right? The candy will be here… eventually. I wasn’t expecting anyone this soon. She seems excited though—maybe a little too excited."
    );
    await dialogNarrator("The witch narrowed her eyes at me.");
    playSFX("Cornelia Hmm");
    await dialogCornelia("You do have candy, right?");
    mePortrait = corn_sad;
    await dialogMe("...", {
        speed: 500,
    });
    await dialogCornelia("Well?");
    await dialogMe("I...", {
        autoDelay: 1000,
    });
    await dialogCornelia("You don't have any candy, do you?");
    await dialogMe(":[", {
        autoDelay: 1000,
    });
    await dialogCornelia("Oh, I see. That's a shame.");
    await dialogCornelia("I was really looking forward to some candy.");
    await dialogCornelia("I guess I'll just have to find another shop.");
    await dialogMe("Wait!");
    await dialogCornelia("?", {
        autoDelay: 2000,
    });
    await dialogMe("Uhm... Who... Who are you?");

    await dialogCornelia("Oh, how rude of me!");
    await dialogCornelia("I'm Cornelia, the Candy Witch.");
    conreliaDisplayName = "Cornelia";
    await dialogCornelia("...");
    await dialogCornelia(
        "Look, sorry for being so rude I do have a little extra candy corn on me."
    );
    await dialogCornelia(
        "A special stash, if you will. Premium quality. Hard to find."
    );
    await dialogNarrator(
        "Her tone shifts. She's is definitelly pliotting something. Is she trying to sell me candy corn in my own shop?"
    );
    mePortrait = corn_derpy;
    await dialogMe(
        'Oh, really? Premium candy corn, huh? I\'ve never heard of anyone carrying their own "stash" before. Must be some powerful stuff.'
    );
    await dialogNarrator(
        "She tilts her head, clearly amused by my attempt to play along."
    );
    await dialogCornelia(
        "Oh, it's not just any candy corn. I make it myself, with a little... magical touch. I bet your shelves would fill right up, and it’d cost you far less than waiting for a shipment."
    );

    await dialogNarrator(
        "I can't help but feel a little suspicious. But... I'm also curious."
    );
    await dialogNarrator(
        "This girl is something else. Still, with no stock and a customer already here, maybe I could play this out... But she is definitely trying to swindle me. Let's see if we can turn tables."
    );

    mePortrait = corn_happy;
    await dialogMe(
        "Magical candy corn, you say? Sounds impressive, Cornelia. But if you’re offering me something special, I’ll need to see a sample first. You know how it is-can’t just buy into a product sight unseen."
    );

    await dialogNarrator("She laughs mischeviously");

    await dialogCornelia("A sample huh?");
    await dialogCornelia(
        "You drive a hard bargain, shopkeep. But this isn't your regular grocery store candy corn. You’ll have to pay for a sample."
    );

    await dialogNarrator(
        "She’s definitely a trickster, but I’m not about to fold that easily."
    );

    mePortrait = corn_sad;
    await dialogMe("Oh, come on, just one bite?");
    await dialogCornelia(
        "If it’s as magical as you say, you’ll hook me with that first taste, and we’ll be talking business in no time."
    );

    await dialogNarrator("I watch her consider this, weighing her options.");

    await dialogNarrator("She taps her chin, pretending to think it over it.");

    await dialogCornelia(
        "Hmm… tempting. But the thing is, once you’ve had a taste, I know you'll want more, and then I’d lose all my leverage. So... how about this—I'll give you a sample if you agree to buy in bulk afterward. A... let's call it, a verbal contract. And trust me, you don’t want to break a deal with a witch like me."
    );

    mePortrait = corn_derpy;
    await dialogMe(
        "A verbal contract? How serious. But what if I told you I can help your special candy corn reach even more people? You sell to me at a fair price, I’ll make sure every fall visitor in town gets a taste. Think of it as... expanding your influence."
    );

    await dialogNarrator(
        "I notice her pause, the idea clearly sparking something in her mischievous little mind."
    );

    playSong("Escargo Express at Your Service!");
    await dialogCornelia("Expand my influence, you say?");
    await dialogCornelia(
        "I do like the sound of that. But you'd better be ready for demand, because once people get a taste, they won't settle for anything less."
    );

    await dialogNarrator(
        "She’s playing hardball, but I can see the excitement in her eyes. I think we’re on to something here."
    );

    await dialogMe(
        "So, what do you say? I get a taste, you get a fair price, and we both walk away winners?"
    );

    await dialogNarrator("She watches me carefully for a moment, then grins");

    await dialogCornelia(
        "Alright, you’ve got yourself a deal. But don’t say I didn’t warn you... this candy corn is addictive. You might end up needing more than you bargained for."
    );

    await dialogNarrator(
        "She pulls a small, brightly colored pouch from her pocket, handing it over like she’s sealing some sort of arcane pact."
    );
};
