import os
from parser.musicxml_parser import musicxml_parser
from parser.txt_parser import sv_score_parser
from parser.midi_parser import mid_note_parser
from synthesizer import notes2midi
from synthesizer import save_midi_2_audio
import librosa
from align import alignment

CHECKPOINT_DIR="/Users/ronggong/Documents_using/pianoAI/data/transcription_models/onset_and_frames"
filename_xml = "../data/Minuet_in_G_Major_Bach_first_16bars.musicxml"
filename_xml_txt = filename_xml+'.txt'
filename_xml_midi = filename_xml+'.midi'
filename_xml_wav = filename_xml+'.wav'
filename_video = '../data/BACH_Minuet_in_G_Major_first16bars.mp4'
filename_video_wav ='../data/BACH_Minuet_in_G_Major_first16bars.wav'
filename_video_midi = filename_video_wav+'.midi'
filename_alignment = "../data/alignment.txt"

# 1. output musicXML to txt
notes_xml = musicxml_parser(filename_xml, filename_xml_txt, bpm=88.0)

# 2. synthesize txt to midi
notes2midi(notes_xml, filename_xml_midi)

# 3. render midi to wav
save_midi_2_audio(filename_xml_midi, filename_xml_wav)

# video processing in pipeline.sh

# 8. alignment
score_t = sv_score_parser(filename_xml_txt)
score_s = mid_note_parser(filename_video_midi)

y_t, sr_t = librosa.load(filename_xml_wav, sr=None)
y_s, sr_s = librosa.load(filename_video_wav, sr=None)

list_score_aligned = alignment(y_t, y_s, sr_t, sr_s, score_t, score_s, plot=False)

with open(filename_alignment, "w") as f:
    for note_t_s in list_score_aligned:
        if not note_t_s[1]:
            note_t_s[1] = [None, None, None, None]
        if not note_t_s[0]:
            note_t_s[0] = [None, None, None, None]
        f.write(str(note_t_s[0][0])+'\t'+str(note_t_s[0][1])+'\t'+str(note_t_s[0][2])+'\t'+str(note_t_s[0][3])+
                '\t'+str(note_t_s[1][0])+'\t'+str(note_t_s[1][1])+'\t'+str(note_t_s[1][2])+'\t'+str(note_t_s[1][3])+'\n')