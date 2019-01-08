import music21


def musicxml_parser(filename, bpm=88):
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

    return notes
        

if __name__ == "__main__":
    notes = musicxml_parser("./data/Minuet_in_G_Major_Bach_first_16bars.musicxml")
    with open("./data/Minuet_in_G_Major_Bach_first_16bars_musicxml.txt", "w") as f:
        for n in notes:
            f.write(str(n[0])+'\t'+str(n[1])+'\t'+str(n[2])+'\t'+n[3]+'\n')