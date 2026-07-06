import fs from 'fs';
import https from 'https';

async function run() {
  try {
    const res = await fetch('https://www.instagram.com/p/DZpzyDio9zk/embed/');
    const html = await res.text();
    // Look for the EmbeddedMediaImage or standard og:image
    let imgUrl = null;
    let match = html.match(/<img class="EmbeddedMediaImage" src="([^"]+)"/);
    if (match) {
      imgUrl = match[1].replace(/&amp;/g, '&');
    } else {
      match = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) imgUrl = match[1].replace(/&amp;/g, '&');
    }

    if (imgUrl) {
      console.log('Found URL:', imgUrl);
      https.get(imgUrl, (response) => {
        const file = fs.createWriteStream('./public/assets/project_04_real.jpg');
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded thumbnail');
        });
      });
    } else {
      console.log('Could not find image URL in HTML.');
    }
  } catch (err) {
    console.error(err);
  }
}

run();
