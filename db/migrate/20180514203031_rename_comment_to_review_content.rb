class RenameCommentToReviewContent < ActiveRecord::Migration[5.1]
  def change
    rename_column :reviews, :comment, :content
  end
end
