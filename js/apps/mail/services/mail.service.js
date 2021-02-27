import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const emailService = {
    query,
    getById,
    saveEmail,
    deleteEmail,
    searchEmailsForSearchStr,
};

const DB_NAME = 'emails_db';
var defaultMails = [];
const emailsData = [
    {
        subject: 'Hello',
        body: 'How are you?',
    },
    {
        subject: 'Reminder about appointment',
        body: `Tomorrow at 5pm,don't be late!`,
    },
    {
        subject: 'I took the world eater to the vet',
        body: `He won't even munch on that new sun we found in px-357`,
    },
    {
        subject: 'Most popular online courses of all time',
        body: `On Coursera,you can choose from thousands of online courses taught by faculty from world-class universities like Yale, Stanford, and Princeton, and gain skills in fields such as data science, finance, cloud computing, and graphic design.\n
        Here are some of our most popular offerings of all time1—check out both free and paid courses!`,
    },
    {
        subject: `Introducing Netlify's Resource Center! Read the latest on Netlify + the Jamstack`,
        body: `Now you can discover the latest resources on all things Netlify & the Jamstack! Whether you’re deploying sites to the Jamstack, are considering a migration, or are looking to learn something new, head on over to the Resource Center to check out the collection of content developed by our very own Netlifolks, customers and partners.\n
        CHECK IT OUT\nHave an idea for content to be featured on the page in the future? Submit your thoughts here! `,
    },
    {
        subject: `Avi, your Local Guides Community Newsletter is here`,
        body: `This month, let’s help businesses in your community with safety updates. Answer a few quick questions about the COVID-19 safety measures taken by places or businesses you've recently visited.`,
    },
    {
        subject: `ELHANAN and 60 others made changes in your shared folders`,
        body: `Activity in Shared Folders\n
        Here's what happened in your shared folders last week\n\n
        CaJan21-ExcerciseSubmission\n\n
        keep-nav.cmp.js\n
        Ream edited Thursday 2/25/2021\n
        email-compose.cmp.js\n
        Ream edited Thursday 2/25/2021\n
        email.service.js\n
        Ream edited Thursday 2/25/2021\n
        email-nav.cmp.js\n
        Ream edited Thursday 2/25/2021\n
        809 images\n
        Ream and 43 others added and edited Thursday 2/25/2021\n
        `,
    },
    {
        subject: 'Zoom meeting link',
        body: `Join Zoom Meeting\n
        https://us02web.zoom.us/j/87T23231611?pwd=NzJxVUlT1VFTTk1JcFppaHpDqUxVZz09\n\n

        Meeting ID: 872 8323 1311\n
        Passcode: 180982\n
        One tap mobile\n
        +13422487719,,87223231611#,,,,*180982# US (Houston)\n
        +16465588656,,87223231611#,,,,*180982# US (New York)\n\n
        
        Dial by your location\n
                +1 316 248 7299 US (Houston)\n
                +1 646 558 8656 US (New York)\n
                +1 669 900 9128 US (San Jose)\n
                +1 253 215 8782 US (Tacoma)\n
                +1 301 715 8592 US (Washington DC)\n
                +1 312 626 6799 US (Chicago)\n
        Meeting ID: 872 2323 1611\n
        Passcode: 180982\n
        Find your local number: https://us02web.zoom.us/u/kkRPC7lPQ
        `,
    },
    {
        subject: 'Most popular online courses of all time',
        body: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure illum repellat id. Tempore officiis aspernatur exercitationem, laborum quia distinctio commodi? Deserunt quos repudiandae, quis atque nobis laboriosam minima harum.
        Quasi error tenetur nobis. Neque sunt nemo facilis quasi. Ducimus accusantium necessitatibus eligendi esse temporibus vel facere explicabo! Magni ratione error natus nihil quis tempora quia cumque optio a in!
        Tempora, nobis fugiat? Nemo debitis nisi possimus, perferendis sunt quam error laborum hic repudiandae tempore aliquam repellat ipsam autem amet dicta, perspiciatis veritatis officia aut magni laboriosam architecto molestias quisquam!
        Molestiae quidem cupiditate nobis. Modi odio, repellendus, obcaecati odit praesentium placeat, et rem libero pariatur voluptates quo expedita blanditiis laboriosam sit porro cupiditate commodi. Perferendis explicabo vero excepturi error consequatur!
        At exercitationem suscipit, deleniti, deserunt aut accusamus ad, porro itaque molestiae optio placeat tempora. Rerum, beatae dolores. Voluptatum perferendis assumenda error corrupti? Sapiente, sed. Nihil dolores veritatis neque reprehenderit rem?
        Reprehenderit temporibus error eligendi aut quia neque a blanditiis animi recusandae sed tempora illo nulla odit, molestias fugit quidem accusamus nesciunt? Ea nemo illo quod, fuga earum sapiente quaerat quia.
        Dignissimos nisi tenetur ab velit amet inventore, error harum veniam! Perferendis, numquam. Incidunt quia deserunt commodi iste quaerat, officiis velit temporibus. Nihil expedita unde modi vitae maiores odit vel assumenda.
        Rem, ex, facere ullam temporibus quia assumenda maiores eligendi dolorem quod fugiat sunt nihil a architecto. Numquam at illo iste, aperiam rem natus, rerum eveniet perspiciatis nihil nisi unde illum.
        Distinctio esse architecto veniam et rerum recusandae veritatis! Provident rem commodi explicabo doloremque iusto velit ut officia neque odit esse sapiente ex impedit perspiciatis accusantium, magni voluptate pariatur omnis voluptatibus!
        Veniam aliquid inventore, iste quos adipisci magnam incidunt debitis cumque, labore dignissimos blanditiis esse voluptas nemo architecto ipsum unde! Laborum commodi aspernatur fuga exercitationem quas dicta sit minus odio culpa!
        Suscipit quam ipsa quo odio quibusdam quos ipsam in fugit cupiditate ut, impedit dolorem eligendi culpa commodi doloremque explicabo voluptatem. Iste libero impedit neque quidem consequatur corporis deleniti magnam harum.
        Tenetur fugiat modi assumenda dignissimos, sit saepe ipsam consequuntur nulla quasi ad voluptas earum suscipit dolor sapiente sed explicabo ut! Odit doloremque sunt reprehenderit perferendis. Beatae iste ducimus ad impedit.
        Modi qui excepturi at unde eius dolores et consequatur quia optio voluptates. Qui odio corrupti aliquid maiores nesciunt numquam officia dolorum dolore cupiditate saepe, accusamus a quaerat vero fugiat omnis?
        Voluptatibus ea aliquam corporis quae ipsa, nobis mollitia iste iure minima quam similique velit saepe sapiente odit quasi suscipit a exercitationem eligendi accusantium, voluptate sequi vel voluptatem aut dolorum? Ex.
        Tenetur in inventore officia tempore sint aliquam saepe, commodi natus, iste reiciendis magnam maiores quia. Nihil sapiente possimus eum sed debitis obcaecati, magni repellat consectetur, dicta exercitationem nesciunt dolorum asperiores?
        Esse, officia. Harum tempore aspernatur tempora quisquam, commodi perferendis praesentium animi dolores, omnis quia, recusandae numquam ea excepturi nihil saepe! Labore ratione dolore dignissimos. Sed autem sapiente perferendis nobis harum.
        Libero quod reiciendis iusto aut esse vitae animi nemo, consequuntur aliquid ut illo consequatur mollitia molestias assumenda magnam sequi, eum id repudiandae at. Enim dicta, porro maiores tempora sequi ad?
        Velit facilis quo repudiandae debitis iste rerum excepturi eius esse vel cum quidem autem quisquam doloremque sed laudantium tempora natus veniam quam aliquid sit, ex ea ratione? Quam, vero atque?
        Vel ullam totam, nobis laudantium libero exercitationem voluptatem similique quisquam quos commodi, architecto nisi, tempore deserunt optio? Cupiditate, excepturi illum aut consectetur, neque eos molestiae reprehenderit qui accusamus impedit natus?
        Iusto, fuga. Hic error beatae fuga et ducimus eius vel tempora! Error at, consequatur aliquam ullam aliquid hic dolore! Quidem minima laudantium assumenda architecto rerum? Nobis fugit molestiae repellat facere.
        Atque alias asperiores amet numquam impedit dolore est tenetur neque explicabo veniam soluta nihil magnam fugiat voluptates natus ab cumque, harum sit velit necessitatibus! Sapiente mollitia minus neque sed. Assumenda.
        Aliquam illum at exercitationem velit molestias ad enim dignissimos officiis reiciendis corrupti explicabo pariatur, recusandae error, aspernatur magni repudiandae dolor minus vitae nobis, maiores repellat! Ipsa voluptate enim labore quas!
        Voluptatum autem, distinctio rem ullam temporibus optio dicta, libero nostrum quibusdam nam esse cumque. Minima atque doloribus, voluptatum enim nisi beatae voluptates cumque facere asperiores. Dignissimos repellendus quo ipsam error.
        Delectus qui earum, culpa dignissimos porro consequatur a. Quos hic provident sunt inventore fugit nam, voluptatibus nobis architecto vel consequuntur fuga laudantium earum, ut reiciendis eos! Amet adipisci minima beatae.
        Quis facere ipsam quasi placeat reiciendis laboriosam voluptatum id animi perspiciatis! Nam, nemo quisquam libero nostrum repudiandae cumque eos aperiam adipisci temporibus hic aliquid, ipsum nobis natus! Maiores, rem fuga!
        Provident sunt qui beatae non mollitia voluptatum enim dolorem eligendi dolores explicabo ducimus nobis, tenetur delectus sed. Consectetur unde officiis hic ab excepturi impedit, rerum similique repellat repudiandae, beatae iure.
        Assumenda commodi maxime, veritatis odio veniam voluptatum corrupti quasi quae architecto molestiae ipsam vel eos soluta qui consequatur minus dolor quas deserunt ut nesciunt consequuntur facere dolorum! Laudantium, deleniti minus!
        Amet itaque temporibus veritatis similique quas cum, beatae commodi quia reprehenderit unde deleniti doloribus molestiae impedit sit quibusdam consequatur? Ratione quaerat repudiandae facilis obcaecati quam omnis eligendi neque, placeat voluptatem?
        Dignissimos voluptatem voluptatum maxime tempore dolor autem non similique quos, ipsam labore sunt debitis pariatur fugit provident totam, quia aliquam ipsum perferendis, mollitia tenetur expedita suscipit odio? Sit, incidunt harum?
        In maxime officiis corporis sunt tempora consequatur explicabo reprehenderit, animi dignissimos aliquam earum, optio odio recusandae quam harum quidem, inventore obcaecati aperiam minima hic alias provident assumenda modi. Perspiciatis, amet?
        Voluptates animi labore rem eum quisquam harum nobis quasi cum minus, impedit vero repellat sapiente maiores consectetur? Dolores atque eligendi dolore molestias rem, dicta, itaque, quidem earum quaerat culpa quae.
        Repellat illo error cum illum, incidunt fugit ducimus atque officiis, rerum sapiente aliquid possimus harum. Quis incidunt doloremque veritatis officiis consequatur. Nisi illo assumenda saepe suscipit, quos blanditiis? Aspernatur, enim.
        Accusamus, tempora eaque. Ipsam asperiores possimus maxime dolore? Magnam aliquid eius repellat aperiam iure unde eos iusto, nam vel ullam quidem pariatur illo odit? Libero eligendi omnis vel consectetur natus?
        Repellat magni inventore perspiciatis perferendis totam laudantium aperiam sit veritatis, ullam beatae. Itaque unde atque, eum rem excepturi distinctio possimus ipsum provident, soluta quaerat quam officiis necessitatibus iure temporibus cumque.
        Quibusdam tempore debitis odit earum alias vel odio! Aliquam impedit quibusdam maxime at, voluptatem ipsum voluptatibus ab labore qui, accusantium est adipisci quisquam, rem rerum! Sunt id nesciunt laudantium aliquam.
        Tenetur, magni maxime dolor numquam molestias fugit itaque reprehenderit aspernatur cupiditate, a ducimus fuga minus eaque accusamus in eos laborum est dolore modi! Dolorum harum culpa, delectus eum adipisci dicta?
        Repellat, asperiores est nihil libero dignissimos enim labore aut qui temporibus molestiae illum cupiditate ullam dolorum id accusantium! Voluptatem ex possimus natus atque laudantium fugiat ipsum odio aperiam blanditiis ducimus!
        Pariatur nesciunt possimus, officiis in, enim quod aliquam, labore illum quaerat quo suscipit molestiae inventore temporibus quisquam minus qui sapiente cumque voluptas! Totam sapiente sit corrupti mollitia sequi cupiditate aliquid.
        Neque officia nam vitae beatae nulla possimus ut illum aspernatur quam sunt necessitatibus delectus est, laudantium ipsam tempora. Tenetur quasi deleniti aliquid, commodi alias voluptatum assumenda dolore repudiandae tempore est.
        Qui velit possimus voluptate beatae nostrum nobis voluptates, expedita obcaecati quisquam hic autem quis maiores optio sunt animi reprehenderit suscipit eaque facilis, illo fugiat libero quas consectetur! Repellat, ratione labore.
        Distinctio, nemo facilis? Quis quas voluptatum, id beatae accusamus aut necessitatibus nulla explicabo esse iure a quaerat porro. Repellendus iusto necessitatibus error facilis voluptate perspiciatis id facere! Beatae, doloremque accusamus.
        Voluptas dolore odio corporis quasi deserunt quo et, sapiente expedita quis cum debitis praesentium numquam possimus iusto autem, molestias sed? Molestiae, aut corporis? Porro esse eum laudantium? Autem, enim vero!
        Ab molestiae repellendus eius rerum non voluptatem qui optio nostrum laborum unde possimus, illum ratione recusandae ducimus officiis reiciendis suscipit accusantium voluptatum et numquam officia fugit alias! Est, corporis atque.
        Quis accusantium aperiam et soluta accusamus eligendi suscipit assumenda facilis reiciendis vitae, reprehenderit aliquid quibusdam nostrum excepturi quos ipsam ullam asperiores placeat modi libero distinctio amet quae eum. Voluptas, dicta?
        Exercitationem est minus doloremque ducimus beatae? Labore culpa earum, quasi illo aliquam fuga voluptas aperiam cupiditate. Debitis voluptates accusamus molestiae, aspernatur beatae, animi sapiente dolorum necessitatibus sit ullam cum aperiam!
        Eligendi nostrum incidunt recusandae eius. Veniam, similique? Placeat nisi tenetur minus qui earum delectus inventore at, quae quibusdam officiis harum dolorum atque dicta distinctio architecto commodi perspiciatis. Possimus, quisquam quo.
        Natus atque eius distinctio cupiditate ut quae doloribus fugiat, ipsa accusantium nobis dignissimos ducimus magni recusandae praesentium, rerum nesciunt corrupti! Minima maiores sunt in ratione facilis dolores doloremque et alias.
        Amet maxime, ea ad, mollitia a eveniet dolorem quisquam quaerat perferendis totam debitis ipsa praesentium atque incidunt perspiciatis repudiandae labore voluptas similique harum nam minus ratione? Blanditiis magnam sequi aliquid.
        Officiis eligendi ullam, accusantium iure, dignissimos reiciendis possimus alias quae, nemo magnam ratione minima ipsa accusamus. Quod voluptatibus sint minima? Necessitatibus aspernatur voluptas, minus suscipit repellat fugit labore reprehenderit soluta.
        Consequatur, architecto nobis? Harum ratione eligendi cum tempora fuga corporis modi sunt cupiditate eaque temporibus maxime vel, nihil impedit, optio quibusdam possimus sint! Ut incidunt labore et aut nesciunt harum.`,
    },
    {
        subject: 'The Lord of the Rings (film series)',
        body: `The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002), and The Return of the King (2003). Produced and distributed by New Line Cinema with the co-production of WingNut Films, it is an international venture between New Zealand and the United States. The films feature an ensemble cast including Elijah Wood, Ian McKellen, Liv Tyler, Viggo Mortensen, Sean Astin, Cate Blanchett, John Rhys-Davies, Christopher Lee, Billy Boyd, Dominic Monaghan, Orlando Bloom, Hugo Weaving, Andy Serkis, and Sean Bean.\n\n
    Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron. The Fellowship eventually splits up and Frodo continues the quest with his loyal companion Sam and the treacherous Gollum. Meanwhile, Aragorn, heir in exile to the throne of Gondor, along with Legolas, Gimli, Boromir, Merry, Pippin, and the wizard Gandalf, unite to rally the Free Peoples of Middle-earth in the War of the Ring in order to aid Frodo by distracting Sauron's attention.\n\n    
    The three films were shot simultaneously and entirely in Jackson's native New Zealand from 11 October 1999 until 22 December 2000, with pick-up shots done from 2001 to 2004. It was one of the biggest and most ambitious film projects ever undertaken, with a budget of $281 million. The first film in the series premiered at the Odeon Leicester Square in London on 10 December 2001; the second film premiered at the Ziegfeld Theatre in New York City on 5 December 2002; the third film premiered at the Embassy Theatre in Wellington on 1 December 2003. An extended edition of each film was released on home video a year after its theatrical release.\n\n
    The Lord of the Rings is widely regarded as one of the greatest and most influential film series ever made. It was a major financial success and is among the highest-grossing film series of all time with $2.981 billion in worldwide receipts. Each film was critically acclaimed, with high praise for their innovative special effects, acting, musical score, and emotional depth, and heavily awarded, the series winning 17 out of its 30 Academy Award nominations.`,
    },
    { subject: 'The Large Hadron Collider', body: `Inside the accelerator, two high-energy particle beams travel at close to the speed of light before they are made to collide. The beams travel in opposite directions in separate beam pipes – two tubes kept at ultrahigh vacuum. They are guided around the accelerator ring by a strong magnetic field maintained by superconducting electromagnets. The electromagnets are built from coils of special electric cable that operates in a superconducting state, efficiently conducting electricity without resistance or loss of energy. This requires chilling the magnets to ‑271.3°C – a temperature colder than outer space. For this reason, much of the accelerator is connected to a distribution system of liquid helium, which cools the magnets, as well as to other supply services.\n\n\n
    Thousands of magnets of different varieties and sizes are used to direct the beams around the accelerator. These include 1232 dipole magnets 15 metres in length which bend the beams, and 392 quadrupole magnets, each 5–7 metres long, which focus the beams. Just prior to collision, another type of magnet is used to "squeeze" the particles closer together to increase the chances of collisions. The particles are so tiny that the task of making them collide is akin to firing two needles 10 kilometres apart with such precision that they meet halfway.All the controls for the accelerator, its services and technical infrastructure are housed under one roof at the CERN Control Centre. From here, the beams inside the LHC are made to collide at four locations around the accelerator ring, corresponding to the positions of four particle detectors – ATLAS, CMS, ALICE and LHCb.` },
];

//CRUD
function query(filter = null, bool) {
    return storageService.query(DB_NAME).then((emails) => {
        if (!emails.length) {
            emails = _addDefaultEmails(emailsData);
            storageService.postMany(DB_NAME, emails);
        }
        if (filter && emails[0].hasOwnProperty(filter)) {
            emails = emails.filter((email) => email[filter] === bool);
        }
        return emails;
    });
}

function searchEmailsForSearchStr({ subject, body }) {
    return storageService.query(DB_NAME).then((emails) => {
        if (!emails.length) return emails || [];
        return (emails = emails.filter((email) => {
            if (email.isTrashed) return false;
            let { subject: emailSubject, body: emailBody } = email;
            subject = subject.toLowerCase();
            emailSubject = emailSubject.toLowerCase();
            body = body.toLowerCase();
            emailBody = emailBody.toLowerCase();
            return emailSubject.includes(subject) && emailBody.includes(body);
        }));
    });
}

function getById(id) {
    return storageService.get(DB_NAME, id);
}

function saveEmail(saveEmail) {
    return getById(saveEmail.id).then((email) => {
        if (email) return storageService.put(DB_NAME, saveEmail);
        return storageService.post(DB_NAME, _createDefaultEmail(saveEmail));
    });
}

function deleteEmail(email) {
    return storageService.remove(DB_NAME, email);
}

//internals
function _createDefaultEmail({ subject, body, sentAt = Date.now() }) {
    const newDefaultMail = {
        id: utilService.makeId(),
        subject,
        body,
        sentAt,
        isRead: false,
        isFavorite: false,
        isTrashed: false,
    };
    return newDefaultMail;
}

function _addDefaultEmails(emailsData) {
    return emailsData.map((emailObj) => _createDefaultEmail(emailObj));
}
