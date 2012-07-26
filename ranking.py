
import sys
import json
import dogpy

@dogpy.extfunc
def rank_k_teachers(me, teachers, k=5):
  def combined_score(t):
    overlap_teach = len(set(t.teachables) | set(me.learnables))
    overlap_learn = len(set(t.learnables) | set(me teachables))
    return overlap_teach + 0.5 * overlap_learn
  teachers.sort(key=combined_score)
  return teachers[:k]

if __name__ == '__main__':
  dogpy.run()
