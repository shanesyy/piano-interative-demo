import music21


def musicxml_parser(filename, filename_output_txt, bpm=88):
    "parse musicXML, output txt, assign bpm"
    coef = 60.0/bpm
    xmlScore = music21.converter.parse(filename)
    notes = []
    for part in xmlScore.parts:
        p = part.flat.notes
        for n in p:
            if n.isNote:
                notes.append((n.offset*coef, n.pitch.midi, n.duration.quarterLength*coef, n.pitch.nameWithOctave))
            if n.isChord:
                for note_in_chord in n.pitches:
                    notes.append((n.offset*coef, note_in_chord.midi, n.duration.quarterLength*coef, note_in_chord.nameWithOctave))

    notes.sort(key=lambda x: x[0])

    with open(filename_output_txt, "w") as f:
        for n in notes:
            f.write(str(n[0])+'\t'+str(n[1])+'\t'+str(n[2])+'\t'+n[3]+'\n')

    return notes
