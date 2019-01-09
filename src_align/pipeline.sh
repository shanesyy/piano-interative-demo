filename_video=../data/BACH_Minuet_in_G_Major_first16bars.mp4
filename_video_wav=../data/BACH_Minuet_in_G_Major_first16bars.wav
CHECKPOINT_DIR=/Users/ronggong/Documents_using/pianoAI/data/transcription_models/onset_and_frames
filename_video_midi=$filename_video_wav.midi

./sound_video_sep.sh $filename_video $filename_video_wav
onsets_frames_transcription_transcribe --acoustic_run_dir=$CHECKPOINT_DIR $filename_video_midi