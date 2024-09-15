import { goto } from "$app/navigation";
import roomBg from "$lib/assets/room.png";
import type { DialogManager } from "$lib/utils/dialog";
import { playSFX } from "$lib/utils/sfx";
import { bounceInOut, elasticOut } from "svelte/easing";
import road from "$lib/assets/road.png";
import candyShopBg from "$lib/assets/bg/bg_shop.png";
import corneliaSprite from "$lib/assets/portraits/cornwitch.png";
import playerIcon from "$lib/assets/portraits/playericon.png";
import { ui_layouts } from "$lib/layouts/layout_components";

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
    ? A
    : never;

export default async (gameSequence: DialogManager) => {
    const dialogCornelia = async (
        text: string,
        opts?: ArgumentTypes<typeof gameSequence.dialog>[1]
    ) => {
        gameSequence.currentPortrait.set(corneliaSprite);
        await gameSequence.dialog(text, {
            ...opts,
            name: "Cornelia",
        });
    };

    const dialogNarrator = async (
        text: string,
        opts?: ArgumentTypes<typeof gameSequence.dialog>[1]
    ) => {
        gameSequence.currentPortrait.set(undefined);
        await gameSequence.dialog(text, opts);
    };

    const dialogMe = async (
        text: string,
        opts?: ArgumentTypes<typeof gameSequence.dialog>[1]
    ) => {
        gameSequence.currentPortrait.set(playerIcon);
        await gameSequence.dialog(text, opts);
    };

    const dialogUnknown = async (
        text: string,
        opts?: ArgumentTypes<typeof gameSequence.dialog>[1]
    ) => {
        gameSequence.currentPortrait.set(undefined);
        await gameSequence.dialog(text, {
            ...opts,
            name: "???",
        });
    };

    gameSequence.uiLayoutComponent.set(ui_layouts.IntroLayout);
    gameSequence.dialogOpacity.set(0);
    await gameSequence.sleep(500);
    gameSequence.dialogOpacity.set(1);

    // playSong("The Picnic Bop");

    await dialogNarrator(
        "The soft blush of dawn filters through the lace curtains, bathing your bedroom in a gentle, golden light. A cool autumn breeze drifts in through the small crack in the window, carrying the earthy scent of fallen leaves and whispering promises of the changing season."
    );
    await dialogNarrator(
        "The warmth of your blankets cradles you in contrast to the crisp air, and for a moment, time seems to pause. The house is still, the world outside muted, as you linger in the quiet peace of morning, savoring the soft, fleeting beauty of this tranquil space. "
    );

    await gameSequence.dialogOpacity.set(0);

    await gameSequence.sleep(1000);
    await gameSequence.bgOpacity.set(0, {
        duration: 500,
        easing: elasticOut,
    });

    gameSequence.uiLayoutComponent.set(ui_layouts.DefaultLayout);
    await gameSequence.bgOpacity.set(0);
    gameSequence.bgOpacity.set(1, {
        easing: bounceInOut,
        duration: 500,
    });
    playSFX("Blink Jingle");

    await gameSequence.sleep(700);
    gameSequence.currentText.set("");
    gameSequence.currentBackground.set(roomBg);
    await playSFX("Alarm Clock");
    await gameSequence.dialogOpacity.set(1);

    await dialogNarrator(
        "The sudden trill of the alarm cuts through the quiet, pulling you from sleep with a gentle but insistent nudge."
    );

    await dialogNarrator(
        "You blink, your eyes slowly adjusting to the morning light as the realization settles in—you’ve overslept."
    );

    await dialogNarrator(
        "A glance at the clock on your bedside table confirms it, the hands ticking well past the time you’d intended to wake."
    );

    await dialogNarrator("With a quiet sigh, you slip out of bed");

    await dialogMe(
        "Halloween is just around the corner, and the candy shop depends on this rush. "
    );

    await dialogNarrator(
        "The shelves need to be perfectly stocked, the displays arranged just right, and you can already picture the line of eager customers forming at the door, waiting for the treats you should have ready by now. "
    );

    await dialogNarrator(
        "The thought of falling behind tugs at you as you hurry to get dressed, your mind running through everything that still needs to be done."
    );

    await dialogMe(
        "Here’s to hoping the candy shop hasn’t turned into a haunted house without me."
    );

    await gameSequence.dialogOpacity.set(0);
    await gameSequence.bgOpacity.set(0, {});
    gameSequence.currentBackground.set(road);
    await gameSequence.sleep(500);

    await gameSequence.bgOpacity.set(1);
    await gameSequence.sleep(1500);
    gameSequence.currentText.set("");
    gameSequence.dialogOpacity.set(1);

    await dialogNarrator(
        "you walk briskly through the crisp autumn morning, the cool air nipping at your cheeks,"
    );

    await dialogNarrator(
        "your thoughts are already at the candy shop. Cornelia is probably there by now, juggling customers and trying to restock without you. "
    );

    await dialogNarrator(
        "She’s capable, no doubt, but today’s rush will be unlike any other—Halloween has a way of making even the calmest days chaotic."
    );

    await dialogNarrator(
        "You mentally tick through the tasks ahead: setting up the special display, checking the orders, and making sure nothing’s missing."
    );

    await dialogNarrator(
        "The worry gnaws at you, knowing Cornelia’s likely overwhelmed, and you quicken your pace, hoping you’re not too late to help her get ahead of the madness!"
    );

    await gameSequence.dialogOpacity.set(0);
    await gameSequence.bgOpacity.set(0, {});
    await gameSequence.bgBlur.set(0.7);
    gameSequence.currentBackground.set(candyShopBg);
    await gameSequence.sleep(500);

    await gameSequence.bgOpacity.set(1);
    await gameSequence.sleep(1500);
    gameSequence.currentText.set("");
    gameSequence.dialogOpacity.set(1);

    // todo: door chime sfx

    await dialogNarrator(
        "As you push open the shop door, the familiar scent of sugar and chocolate greets you, along with the sight of Cornelia expertly serving a small group of early customers."
    );

    await gameSequence.dialog(
        " You rush behind the counter, already fumbling for an apology.  "
    );

    await dialogMe("I’m so sorry I’m late, Cornelia. I overslept, and—");

    await dialogNarrator(
        "Before you can finish, Cornelia waves a hand dismissively, a warm smile on her face."
    );

    gameSequence.charRight.set(corneliaSprite);

    await dialogCornelia(
        "No big deal. It’s been pretty quiet so far. You’re just in time for the real madness"
    );
    await dialogNarrator("she says with a wink.");
    await dialogNarrator(
        "Her calm demeanor eases some of the tension in your chest, though you still feel the weight of the day ahead."
    );

    await dialogNarrator(
        "You step behind the counter, shaking off the chill from outside."
    );
    await dialogMe("Still, I hate leaving you to handle things alone,");
    await dialogNarrator(
        "You glance at the shelves, half-stocked with candy jars."
    );
    await dialogNarrator(
        "Cornelia laughs lightly, sliding a bag of caramels to a customer."
    );
    await dialogCornelia(
        "Oh please, you act like it's my first Halloween rush. I can handle a few early birds."
    );
    await dialogNarrator(
        "You glance around the shop, noticing a few empty spots on the shelves."
    );
    await dialogMe("Have you started on the pumpkin truffles yet?");
    await dialogCornelia("Cornelia smirks, wiping her hands on her apron.");
    await dialogCornelia(
        "I made a batch this morning, but we’re going to need more. Those things fly off the shelves."
    );
    await dialogMe("Of course they do,");
    await dialogNarrator("You sigh");
    await dialogCornelia(
        "Guess I’ll be spending the next hour in the kitchen."
    );
    await dialogNarrator("Cornelia nudges you with her elbow.");
    await dialogMe("You owe me for getting a head start without you!");
    await dialogNarrator("You laugh.");
    await dialogMe("I knew there was a catch.");
    await dialogCornelia(
        "Just make sure you're ready when the after-school crowd hits,"
    );
    await dialogNarrator("Cornelia warns, her eyes gleaming.");
    await dialogCornelia("That’s when things really get fun.");
    await dialogMe("Fun?");
    await dialogNarrator("you reply with a groan.");
    await dialogMe("You and I clearly have very different ideas of fun.");
    await dialogNarrator("Cornelia grins, unfazed.");
    await dialogCornelia("Trust me, it’s all about survival at this point.");

    //
    // remove cornelia
    gameSequence.charRight.set(undefined);

    await gameSequence.dialogOpacity.set(0);
    await gameSequence.bgOpacity.set(0, {});
    await gameSequence.bgBlur.set(0, {
        duration: 100,
    });
    gameSequence.currentBackground.set(road);
    await gameSequence.sleep(500);

    await gameSequence.bgOpacity.set(1);
    await gameSequence.sleep(1500);
    gameSequence.currentText.set("");
    gameSequence.dialogOpacity.set(1);

    gameSequence.bgBlur.set(0.5, {
        duration: 10000,
    });

    await dialogNarrator(
        "The next few hours blur into a whirlwind of activity."
    );
    await dialogNarrator(
        "You and Cornelia work in a seamless rhythm, filling trays with colorful treats and greeting the steady flow of customers that grows by the minute."
    );

    await dialogNarrator(
        "In the back, the scent of melting chocolate and warm sugar fills the air as you carefully prepare more pumpkin truffles, while out front, Cornelia artfully restocks jars of candy corn and caramel apples. "
    );

    await dialogNarrator(
        "The bell above the door jingles constantly, marking the arrival of excited children and their parents, each eager to scoop up Halloween goodies. "
    );

    await dialogNarrator(
        "Between handling special requests, bagging orders, and keeping the display cases full, the morning slips away in a flurry of sugar and laughter.  "
    );

    await gameSequence.dialogOpacity.set(0);
    await gameSequence.bgOpacity.set(0, {});
    await gameSequence.bgBlur.set(0.7);
    gameSequence.currentBackground.set(candyShopBg);
    await gameSequence.sleep(500);

    await gameSequence.bgOpacity.set(1);
    await gameSequence.sleep(1500);
    gameSequence.currentText.set("");

    gameSequence.charRight.set(corneliaSprite);
    gameSequence.dialogOpacity.set(1);

    await dialogNarrator(
        "By the time the early afternoon sun filters through the shop windows, you barely notice how quickly the hours have passed. "
    );

    await dialogNarrator(
        "Just as the afternoon rush begins to slow, the phone rings, its shrill tone cutting through the chatter of the shop."
    );

    await dialogNarrator(
        "You answer, expecting another last-minute order for Halloween-"
    );

    await dialogNarrator(
        "But the voice that greets you on the other end is eerie and off-putting, it leaves and awful feeling in your stomach- You've never felt anything like it before."
    );

    await dialogNarrator(
        "each word drawn out slowly, like they’re savoring the request- "
    );

    // replace by dialog Unknown
    await dialogUnknown("I'd like to place a special order,");

    await dialogMe(
        "Of course, we take special orders. What exactly were you looking for?"
    );

    await dialogNarrator(
        "The voice on the other end begins, steady and deliberate."
    );
    await dialogUnknown("First, I’ll need oak honey-", {
        autoDelay: 2000,
    });
    await dialogUnknown("But not just any kind-", {
        autoDelay: 2000,
    });
    await dialogUnknown("it must come from the old Grove on the edge of town.");
    await dialogUnknown("The flavor is dark, rich... earthy.");
    await dialogUnknown(
        "You’ll use it to craft dark honeycomb toffees, rich and dense, the kind that melt slowly on the tongue.  "
    );
    await dialogUnknown(
        "The flavor should be as deep as the forest it comes from."
    );

    await dialogNarrator("A brief pause, then they continue");

    await dialogUnknown(
        "Next, you’ll need to collect rose hips, but only from the wild roses that grow by the cemetery."
    );

    await dialogUnknown(
        "Those flowers bloom under the shadow of the tombstones. Their hips are small, black as night, and tart enough to bite."
    );
    await dialogUnknown(
        "For the rose hips, you’ll need to turn them into rose-hip jelly bonbons."
    );
    await dialogUnknown(
        "The filling should be sharp, almost sour, with just enough sweetness to balance the bitterness of the cemetery roses."
    );

    await dialogNarrator("The voice grows quieter, almost a whisper now.");

    await dialogUnknown(
        "Finally, you’ll have to fetch moonweed from the bottom of the old town well."
    );
    await dialogUnknown("It grows deep in the water, hidden in the darkness.");
    await dialogUnknown(
        "Pale, delicate. Few dare to go down there... but that’s what I need."
    );
    await dialogUnknown(
        "the moonweed… it must be made into moonweed taffy. Soft, pale, and delicate, like the plant itself."
    );
    await dialogUnknown(
        "It should taste of something faintly otherworldly—cool, almost bitter, with a sweetness that lingers just on the edge."
    );

    await dialogNarrator(
        "You grip the phone tightly, eyes narrowing as you listen to the strange requests. Glancing over at Cornelia, who’s busy stocking the shelves, you catch her eye for a brief moment."
    );

    await dialogNarrator(
        "She raises an eyebrow, sensing something off, but you look away quickly, unsure how to even explain the bizarre ingredients."
    );

    await dialogMe("I’m not sure we can—");
    await dialogNarrator("You start, hesitation creeping into your voice.");

    await dialogNarrator(
        "Before you can finish, the voice on the other end interrupts, smooth and calm."
    );

    await dialogUnknown(
        "I’ll pay you handsomely. Triple your normal rate. Enough to cover your shop’s expenses for months."
    );

    await dialogNarrator(
        "Your breath catches, the promise of that much money too tempting to ignore."
    );

    await dialogNarrator(
        "You look at Cornelia again, biting your lip. She gives you a curious glance, still unaware of the conversation, but you can feel her silent question: What’s going on?"
    );

    await dialogNarrator(
        "There’s a long pause before you finally speak again."
    );

    await dialogMe("Triple, huh?");

    await dialogNarrator(
        "The offer hangs heavy in the air, difficult to refuse."
    );

    await dialogUnknown(
        "Call me on Halloween night. I’ll tell you where to deliver the sweets."
    );

    await dialogNarrator(
        "The voice offers a final push. I'll tell you where to deliver the sweets."
    );

    // And with that, the line clicks dead, leaving you standing there, phone in hand, heart racing, and a knot of worry tightening in your stomach.
    await dialogNarrator(
        "And with that, the line clicks dead, leaving you standing there, phone in hand, heart racing, and a knot of worry tightening in your stomach."
    );

    // You lower the phone slowly, the weight of the conversation settling in.
    await dialogNarrator(
        "You lower the phone slowly, the weight of the conversation settling in."
    );

    // Cornelia looks over, her brows furrowed with concern. You take a deep breath and walk toward her, rubbing the back of your neck.
    await dialogNarrator(
        "Cornelia looks over, her brows furrowed with concern. You take a deep breath and walk toward her, rubbing the back of your neck."
    );

    // “So, that was... weird,”
    await dialogMe("So, that was... weird,");
};
