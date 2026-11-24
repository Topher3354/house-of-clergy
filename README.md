# House of Clergy directory — demo

A clickable, static demo of a national coordination and information system for the House of Clergy, Church of Nigeria (Anglican Communion). It was built as a volunteer project by AYVO, a brand of Trublshut AI Limited.

**This is a demo with fictional sample data.** Do not enter real clergy names or telephone numbers. Nothing is sent to a server.

## Open the demo

Serve this folder, or open `index.html` directly:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/. There is no build step, no backend, and no paid services.

If a previous visit is still saved in the browser, press **Reset demo**.

## What you can try

Use **Role (demo only)** in the header to switch between:

- **Secretary** — dashboard, directory search and filters (including committee), record detail with an audit trail, posting a circular, meetings calendar, committee reports, acknowledgement tracker, and CSV export for handover
- **Provincial verifier** — a queue of records for one province, with Check, Verify, or Return with a note, plus news, meetings and reports
- **Clergy representative** — confirm or correct your details (clerical designation is a list you can also type), read news and acknowledge circulars, see meeting notices and agendas, upload a sample committee report, and use a contact directory that shows email or phone only if that person opted in

**Reset demo** restores the original sample data and clears this browser’s saved changes.

## Sample data

- The 14 province names are the ecclesiastical provinces listed on the official Church of Nigeria site on 29 May 2024: https://anglican-nig.org/50-things-to-know-about-the-church-of-nigeria-anglican-communion/
- Dioceses, people, emails, meetings and reports are invented
- Phone numbers use the obviously fake pattern `+234 800 000 00xx`
- Every screen is labelled **Demo, sample data**
- Changes, including a demo report “upload”, are stored only in this browser (`localStorage`). Uploads keep the file name only; the file itself is not stored.

A live system would add secure logins and a protected database. Clergy personal data should not sit in a public website folder.
