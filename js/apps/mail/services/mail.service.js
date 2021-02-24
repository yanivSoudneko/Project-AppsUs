import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const emailService = {
    query,
    getById,
    saveEmail,
    deleteEmail,
};

const DB_NAME = 'emails_db';
var defaultMails = [];
const emailsData = [
    {
        subject: 'Hello',
        body: 'How are you?',
    },
    {
        subject: 'Get free pills!',
        body: 'Free pills here:pills.org.notspam',
    },
    {
        subject: 'Reminder about Meeting',
        body: 'You have a meeting tomorrow',
    },
    {
        subject: 'Long ass email',
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
];

//CRUD
function query(filter = null, bool) {
    return storageService.query(DB_NAME).then((emails) => {
        console.log('emails:', emails[0]);
        if (!emails.length) {
            emails = _addDefaultEmails(emailsData);
            storageService.postMany(DB_NAME, emails);
        }
        if (filter && emails[0].hasOwnProperty(filter)) {
            emails = emails.filter((email) => email[filter] === bool);
            console.log('emails filtered:', emails);
            console.log({ id: emails[0].id, isTrashed: emails[0].isTrashed });
        }
        return emails;
    });
}

function getById(id) {
    return storageService.get(DB_NAME, id);
}

function saveEmail(saveEmail) {
    return getById(saveEmail.id).then((email) => {
        if (email) return storageService.put(DB_NAME, saveEmail);
        return storageService.post(DB_NAME, saveEmail);
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
