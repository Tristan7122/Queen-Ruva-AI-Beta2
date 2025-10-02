//* CREATED BY ICONIC TECH
//* QUEEN RUVA AI BETA
//* Visit: codewave-unit.zone.id

const fetch = require("node-fetch");

module.exports = async (IconicTechInc, update, store) => {
    console.log("🔄 Group participants update event triggered:", update);

    try {
        const { id, participants, action } = update;
        if (!id || !participants.length) return; // Validate data

        if (!global.welcome) return; // Exit if welcome system is disabled

        // Fetch group metadata
        let group;
        try {
            group = await IconicTechInc.groupMetadata(id);
        } catch (err) {
            console.error("❌ Failed to fetch group metadata:", err);
            return;
        }

        const groupName = group.subject || "Group";
        const groupOwner = group.owner || "UnknownOwner";

        // Get current date and time
        const now = new Date();
        const currentDate = now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const currentTime = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        // Fetch random advice from API
        const fetchAdvice = async () => {
            try {
                const res = await fetch(
                    "https://api.giftedtech.web.id/api/fun/advice?apikey=gifted"
                );
                const data = await res.json();
                if (!data.status || !data.result) return null;
                return data.result;
            } catch (err) {
                console.warn("⚠️ Advice API failed:", err.message);
                return null;
            }
        };

        // Process each participant
        for (const participant of participants) {
            console.log("👤 Processing participant:", participant);

            // Default profile picture
            let ppUrl = "https://i.imgur.com/qZcSKiJ.png";
            try {
                ppUrl = await IconicTechInc.profilePictureUrl(participant, "image");
            } catch (err) {
                console.warn(`⚠️ Profile picture not available for ${participant}`);
            }

            const username = (await IconicTechInc.getName(participant)) || "User";
            const advice = await fetchAdvice();

            if (action === "add") {
                // Welcome Message
                const welcomeMessage = `┏━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎉 WELCOME TO ${groupName}! 🎉
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 User: @${participant.split("@")[0]}
┃ 🏠 Group: ${groupName}
┃ 🔑 Owner: @${groupOwner.split("@")[0]}
┃ 📅 Date: ${currentDate}
┃ ⏰ Time: ${currentTime}
┃ 🪀 Bot Channel: https://whatsapp.com/channel/0029ValX2Js9RZAVtDgMYj0r
┃ 💡 Advice: ${advice || "Stay positive and keep learning!"}
┃ 🤖 Bot: Queen Ruva AI Beta
┃ 🌍 Visit: codewave-unit.zone.id
┃ 👤 Developer: ɪᴄᴏɴɪᴄ ᴛᴇᴄʜ
┗━━━━━━━━━━━━━━━━━━━━━┛`;

                const welcomeImage = {
                    image: { url: ppUrl },
                    caption: welcomeMessage,
                    mentions: [participant, groupOwner],
                };

                console.log("📩 Sending welcome message to:", id);
                try {
                    await IconicTechInc.sendMessage(id, welcomeImage);
                    console.log("✅ Welcome message sent successfully.");
                } catch (err) {
                    console.error("❌ Failed to send welcome message:", err);
                }
            } else if (action === "remove") {
                // Farewell Message
                const farewellMessage = `┏━━━━━━━━━━━━━━━━━━━━━┓
┃ 😔 WE LOST OUR SOLDIER
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 💔 We will miss you, @${participant.split("@")[0]}
┃ 🏠 Group: ${groupName}
┃ 🔑 Owner: @${groupOwner.split("@")[0]}
┃ 📅 Date: ${currentDate}
┃ ⏰ Time: ${currentTime}
┃ 🤖 Bot: Queen Ruva AI Beta
┃ 💬 Goodbye, warrior!
┃ 👤 Developer: ɪᴄᴏɴɪᴄ ᴛᴇᴄʜ
┗━━━━━━━━━━━━━━━━━━━━━┛`;

                const farewellImage = {
                    image: { url: ppUrl },
                    caption: farewellMessage,
                    mentions: [participant, groupOwner],
                };

                console.log("📩 Sending farewell message to:", id);
                try {
                    await IconicTechInc.sendMessage(id, farewellImage);
                    console.log("✅ Farewell message sent successfully.");
                } catch (err) {
                    console.error("❌ Failed to send farewell message:", err);
                }
            }

            // Optional: send newsletter/channel
            if (global.newsletterJid) {
                try {
                    await IconicTechInc.sendMessage(global.newsletterJid, {
                        text: `📢 New participant: ${username} joined ${groupName} on ${currentDate}`,
                    });
                } catch (err) {
                    console.warn("⚠️ Failed to send newsletter update:", err.message);
                }
            }
        }
    } catch (err) {
        console.error("❌ Auto-Welcome Error:", err);
    }
};

/* Notes:
✔ Random advice for every new user
✔ Clean and professional message template
✔ Supports welcome and farewell messages
✔ Newsletter/channel JID integration
✔ Fully branded by ICONIC TECH and Queen Ruva AI Beta
*/